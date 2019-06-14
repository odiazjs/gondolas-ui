import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { DataCatalogsService } from './services/data-catalogs.service';
import { MatDialog, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from '@asura-media/ui-sdk';
import { Catalog } from './models/catalog';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-crud-catalogs',
    templateUrl: './crud-catalogs.component.html',
    styleUrls: ['./crud-catalogs.component.scss']
})

export class CrudCatalogsComponent implements OnInit, AfterViewInit {

    @Input() apiUrl: string;
    @Input() address: string;
    @Input() location: { lat: number, lng: number };

    @Input() catalogs: any;
    @Input() brand: Catalog;

    @Input() columns: string[];
    @Input() entityName: string;
    @Input() catalogsTitle: string;
    @Input() imageUploadConfig: any;

    @Input() readonly: boolean;
    @Input() onCheckboxChange: { fn: (checked, row) => any, proto: any };

    @Input() onDataChange: Subject<any[]> = new Subject<any[]>();

    displayedColumns;
    exampleDatabase: DataCatalogsService | null;
    dataSource: ExampleDataSource | null;
    index: number;
    id: number;

    constructor(public httpService: HttpService<Catalog>,
        public dialog: MatDialog,
        public dataService: DataCatalogsService,
        private snackBar: MatSnackBar,
        private store: Store
    ) {

    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    ngOnInit() {
        setTimeout(() => {
          this.onDataChange.subscribe((data) => {
            this.dataSource.renderedData = [...this.dataSource.renderedData.map((item: any, index) => {
              const listItem = data[index];
              if (listItem) {
                if (listItem.id === item.id) {
                  item.checked = true;
                }
              }
              return item;
            })]
          })
        })
        this.displayedColumns = [...this.columns]
        this.loadData();
    }

    ngAfterViewInit() {

    }

    onCheckboxEvent (checked, row, prototype) {
      if (this.onCheckboxChange) {
        this.onCheckboxChange.fn.bind(prototype)(checked, row);
      }
    }

    refresh() {
        this.loadData();
    }

    addNew(catalog) {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: {
                entity: catalog,
                brand: this.brand,
                address: this.address,
                location: this.location,
                catalogs: this.catalogs ? this.catalogs : {},
                entityName: this.entityName,
                imageUploadConfig: this.imageUploadConfig
            }
        });

        dialogRef.afterClosed().pipe().subscribe(result => {
            if (result === 1) {
                this.dataService.files = [];
                this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
                this.refreshTable();
            }
        });
    }

    startEdit(catalog: any) {
        this.id = catalog.id;
        const dialogRef = this.dialog.open(EditDialogComponent, {
            data: {
                entity: catalog,
                entityName: this.entityName,
                name: catalog.name,
                brand: catalog.brand ? catalog.brand.id : null,
                address: catalog.address,
                format: catalog.format ? catalog.format.id : null,
                chain: catalog.chain ? catalog.chain.id : null,
                channel: catalog.channel ? catalog.channel.id : null,
                city: catalog.city ? catalog.city.id : null,
                state: catalog.state ? catalog.state.id : null,
                location: { lat: catalog.lat, lng: catalog.lng },
                previousFiles: [catalog.imageName],
                imageUploadConfig: this.imageUploadConfig
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
                this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
                this.refreshTable();
            }
        });
    }

    deleteItem(catalog: any) {
        this.id = catalog.id;
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            data: {
                entity: catalog,
                entityName: this.entityName,
                previousFiles: [catalog.imageName],
                imageUploadConfig: this.imageUploadConfig
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
                this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
                this.refreshTable();
            }
        });
    }


    private refreshTable() {
        this.loadData();
        this.paginator._changePageSize(this.paginator.pageSize);
    }

    public loadData() {
        DataCatalogsService.apiUrl = this.apiUrl;
        this.exampleDatabase = new DataCatalogsService(this.httpService, this.snackBar, this.store);
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
            });
    }
}

export class ExampleDataSource extends DataSource<Catalog> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: Catalog[] = [];
    renderedData: Catalog[] = [];

    constructor(public _exampleDatabase: DataCatalogsService,
        public _paginator: MatPaginator,
        public _sort: MatSort) {
        super();
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    connect(): Observable<Catalog[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];

        this._exampleDatabase.getAll();


        return merge(...displayDataChanges).pipe(map(() => {
            this.filteredData = this._exampleDatabase.data.slice().filter((catalog: Catalog) => {
                if (catalog && (catalog.id || catalog.name || catalog.description )) {
                    const searchStr = (
                        catalog.id +
                        catalog.name +
                        catalog.description
                    ).toLowerCase();
                    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
                }
            });

            const sortedData = this.sortData(this.filteredData.slice());
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;
        }
        ));
    }

    disconnect() { }

    sortData(data: Catalog[]): Catalog[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}
