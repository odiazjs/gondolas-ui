import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from './services/data.service';
import { MatDialog, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../users/users.service';
import { HttpService } from '@asura-media/ui-sdk';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit, AfterViewInit {
    displayedColumns = ['id', 'nombre', 'rol', 'actions'];
    exampleDatabase: DataService | null;
    dataSource: ExampleDataSource | null;
    index: number;
    id: number;

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

    addNew(user) {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: user
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
            data: row
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
        this.exampleDatabase = new DataService(this.httpService, this.snackBar);
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

export class ExampleDataSource extends DataSource<User> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: User[] = [];
    renderedData: User[] = [];

    constructor(public _exampleDatabase: DataService,
        public _paginator: MatPaginator,
        public _sort: MatSort) {
        super();
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<User[]> {
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
            this.filteredData = this._exampleDatabase.data.slice().filter((user: User) => {
                if (user && (user.company && user.jobTitle && user.device && user.role)) {
                    const searchStr = (
                        user.id +
                        user.code +
                        user.name +
                        user.role.name +
                        user.company.name +
                        user.jobTitle.name
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
    sortData(data: User[]): User[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'company': [propertyA, propertyB] = [a.company.name, b.company.name]; break;
                case 'code': [propertyA, propertyB] = [a.code, b.code]; break;
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}
