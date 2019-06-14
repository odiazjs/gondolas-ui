import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestService, HttpService } from '@asura-media/ui-sdk';
import { MatSnackBar } from '@angular/material';
import { catchError, map } from 'rxjs/operators';
import { Catalog } from '../models/catalog';
import { Store } from '@ngxs/store';
import { CatalogState } from '../../ngxs/catalogs.state';
import EntityDataResolver from './entity-data-resolver';

@Injectable()
export class DataCatalogsService extends RequestService<Catalog[]> {

  dataSet: any;
  dialogData: any;
  files: any[] = [];
  location: { lat?: number, lng?: number } = {};
  public static apiUrl: string = '';
  dataChange: BehaviorSubject<Catalog[]> = new BehaviorSubject<Catalog[]>([]);

  formats$: Observable<Catalog[]>;
  chains$: Observable<Catalog[]>;
  channels$: Observable<Catalog[]>;
  cities$: Observable<Catalog[]>;
  states$: Observable<Catalog[]>;
  brands$: Observable<Catalog[]>;
  roles$: Observable<Catalog[]>;
  companies$: Observable<Catalog[]>;
  jobTitles$: Observable<Catalog[]>;
  phoneCompanies$: Observable<Catalog[]>;

  constructor(
    httpService: HttpService<any>,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    super(
      httpService,
      DataCatalogsService.apiUrl,
      (result) => { return result.data }
    )
    console.log('data catalogs', this.data);
    this.formats$ = CatalogState.stateSelector('formats', this.store);
    this.chains$ = CatalogState.stateSelector('chains', this.store);
    this.channels$ = CatalogState.stateSelector('channels', this.store);
    this.cities$ = CatalogState.stateSelector('cities', this.store);
    this.states$ = CatalogState.stateSelector('states', this.store);
    this.brands$ = CatalogState.stateSelector('brands', this.store);
    this.roles$ = CatalogState.stateSelector('roles', this.store);
    this.companies$ = CatalogState.stateSelector('companies', this.store);
    this.jobTitles$ = CatalogState.stateSelector('jobTitles', this.store);
    this.phoneCompanies$ = CatalogState.stateSelector('phoneCompanies', this.store);
  }

  get data(): Catalog[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  stateSelector (type) {
    return this.store.select(CatalogState.catalogsOfType).pipe(
      map(filterFn => {
        return filterFn(type)
      })
    )
  }

  getAll(preloadedList: any[] = []): void {
    if (preloadedList.length) {
      this.dataChange.next(preloadedList);
      return;
    }
    this.getList()
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            return of([])
          }
          return err
        })
      )
      .subscribe((data: any) => {
        const url = this.baseUrl;
        data = data.map(item => {
          if (item.imageName) {
            const toReplace = url.substring(url.lastIndexOf('/'), url.length + url.lastIndexOf('/'));
            item.imageName = `${url.replace(toReplace, '/images')}/${item.imageName}`;
          }
          return item
        })
        this.dataChange.next(data);
      });
  }

  addCatalog(data): void {

    let formData = new FormData();

    if (data.entity.files) {
      data.entity.files.forEach(file => {
        formData.append(`file-name`, file)
      })
    }

    formData.append('name', data.name)

    if (data.address) {
      formData.append('address', data.address)
    }

    if (data.brand) {
      formData.append('brand', data.brand)
    }

    data = Object.assign(data, this.location);
    const payload = EntityDataResolver.resolve(data);
    Object.keys(payload).forEach(key => formData.append(key, payload[key]))

    this.baseUrl = DataCatalogsService.apiUrl;
    this.httpClient.post( this.baseUrl, formData)
      .subscribe(result => {
        this.dialogData = Object.assign({}, data);
        this.snackBar.open('Creado exitosamente.', 'Ok', { duration: 3500 });
      },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok',  { duration: 3500 });
        });
  }

  updateCatalog(data): void {

    let formData = new FormData();

    if (data.entity.files) {
      data.entity.files.forEach(file => {
        formData.append(`file-name`, file)
      })
    }

    formData.append('name', data.name)

    data = Object.assign(data, this.location);
    const payload = EntityDataResolver.resolve(data);
    Object.keys(payload).forEach(key => formData.append(key, payload[key]))

    this.baseUrl = DataCatalogsService.apiUrl;
    this.httpClient.put(`${this.baseUrl}/${data.entity.id}`, formData).subscribe(data => {
      this.dialogData = data;
      this.snackBar.open('Actualizado exitosamente.', 'Ok', { duration: 3500 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok', { duration: 3500 });
      }
    );
  }

  deleteCatalog(data): void {
    this.baseUrl = DataCatalogsService.apiUrl;
    this.deleteById(data.entity.id).subscribe(data => {
      this.snackBar.open('Eliminado exitosamente.');
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok', { duration: 3500 });
      }
    );
  }
}




