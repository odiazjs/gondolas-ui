import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService, Product, Side } from './services/data.service';
import { MatDialog, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from '@asura-media/ui-sdk';
import { Store } from '@ngxs/store';

export const PRODUCT_INITIAL_STATE: Product = {
    name: '',
    brand: 1,
    category: 1,
    code: '',
    flavor: 1,
    presentation: 1,
    weight: 0,
    weightUnit: 'gr',
    sides: [
        {
            name: 'Front',
            width: 0,
            height: 0,
            Front: null
        },
        {
            name: 'Back',
            width: 0,
            height: 0,
            Back: null
        },
        {
            name: 'RightSide',
            width: 0,
            height: 0,
            RightSide: null
        },
        {
            name: 'LeftSide',
            width: 0,
            height: 0,
            LeftSide: null
        }
    ],
    imageUploadConfig: {
        max: 1,
        url: '',
        headers: { 'Cache-Control': 'no-cache' },
        btnText: 'Imagen',
        boxMessage: '',
        extensions: ['jpg', 'png', 'gif'],
        previousFiles: [],
        removed: (side?: Side) => {
            console.log('removed!');
            const unusedSpaces: NodeListOf<any> = document.querySelectorAll('div.img-ul-file-upload.img-ul-hr-inline-group');
            unusedSpaces.forEach(el => {
                if (el.textContent === 'Limpiar') {
                    el.style.display = 'block';
                }
            })
            side[side.name] = null;
        },
        onFinished: (event, side?: Side) => {
          console.log('finished!', event);
          const elements: NodeListOf<any> = document.querySelectorAll('div.img-ul-file-upload button.img-ul-clear');
          elements.forEach(el => el.style.display = 'none');
          const unusedSpaces: NodeListOf<any> = document.querySelectorAll('div.img-ul-file-upload.img-ul-hr-inline-group');
          unusedSpaces.forEach(el => {
              if (el.textContent === 'Limpiar') {
                  el.style.display = 'none';
              }
          })
          side[side.name] = event.file;
        },
        onStateChanged: () => { console.log('state changed!') }
    }
}

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, AfterViewInit {
    displayedColumns = ['id', 'nombre', 'category', 'weight', 'code', 'flavor', 'actions'];
    exampleDatabase: DataService | null;
    dataSource: ExampleDataSource | null;
    index: number;
    id: string;

    product: Product = Object.assign({}, PRODUCT_INITIAL_STATE);

    constructor(public httpService: HttpService<any>,
        public dialog: MatDialog,
        public dataService: DataService,
        private snackBar: MatSnackBar,
        private store: Store
    ) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    ngOnInit() {
        this.loadData();
    }

    ngAfterViewInit() {
        
    }

    refresh() {
        this.loadData();
    }

    addNew(product: Product) {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: product
        });

        dialogRef.afterClosed().pipe().subscribe(result => {
            if (result === 1) {
                this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
                this.refreshTable();
            }
        });
    }

    startEdit(row: any) {
        this.id = row.id;
        const dialogRef = this.dialog.open(EditDialogComponent, {
            data: Object.assign({
                imageUploadConfig: PRODUCT_INITIAL_STATE.imageUploadConfig
            }, row)
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                // When using an edit things are little different, firstly we find record inside DataService by id
                const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
                // Then you update that record using data from dialogData (values you enetered)
                this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
                // And lastly refresh table
                this.refreshTable();
            }
        });
    }

    deleteItem(row: any) {
        this.id = row.id;
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: row
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
                // for delete we use splice in order to remove single object from DataService
                this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
                this.refreshTable();
            }
        });
    }


    private refreshTable() {
        this.loadData();
    }



    public loadData() {
        this.exampleDatabase = new DataService(this.httpService, this.snackBar, this.store);
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
                this.paginator._changePageSize(this.paginator.pageSize);
            });
    }
}

export class ExampleDataSource extends DataSource<Product> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: Product[] = [];
    renderedData: Product[] = [];

    constructor(public _exampleDatabase: DataService,
        public _paginator: MatPaginator,
        public _sort: MatSort) {
        super();
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Product[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];

        this._exampleDatabase.getAllIssues();


        return merge(...displayDataChanges).pipe(map(() => {
            // Filter data
            this.filteredData = this._exampleDatabase.data.slice().filter((product: Product) => {
                if (product && (product.name || product.code || product.brand || product.category)) {
                    const searchStr = (
                        product.id +
                        product.code +
                        product.name +
                        product.brand +
                        product.category
                    ).toLowerCase();
                    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
                }
            });

            // Sort filtered data
            const sortedData = this.sortData(this.filteredData.slice());

            // Grab the page's slice of the filtered sorted data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;
        }
        ));
    }

    disconnect() { }


    /** Returns a sorted copy of the database data. */
    sortData(data: Product[]): Product[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'company': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'code': [propertyA, propertyB] = [a.code, b.code]; break;
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}