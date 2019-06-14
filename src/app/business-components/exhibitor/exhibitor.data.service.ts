import { Injectable } from '@angular/core';
import { getUrlConfiguration, setUrlConfiguration, RequestService, HttpService } from '@asura-media/ui-sdk';
import { Observable, of } from 'rxjs';
import { Catalog } from '../users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { endpointsUrl } from '../../../environments/config';
import { Http, Headers } from '@angular/http';

setUrlConfiguration(endpointsUrl as any);

let API_URL = getUrlConfiguration().usersUrl;

/**
 * Parse object as string params
 * for API service query [params].
 */
export class QueryOptions {
  public static toQueryString(paramsObject: any): string {
    return Object
      .keys(paramsObject)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
      .join('&');
  }
}

@Injectable()
export class ExhibitorDataService extends RequestService<any[]> {
  public model = {
    name: '',
    imageName: '',
    width: 0,
    height: 0,
    gondolaType: 1,
    category: 1,
    files: [],
    cells: [],
    brands: [],
    establishments: []
  };
  gondolaTypes$: Observable<Catalog[]> = of([
    { id: 1, name: 'Gondola', isActive: true, description: '' },
    { id: 2, name: 'Punta de Gondola', isActive: true, description: '' },
    { id: 3, name: 'Araña', isActive: true, description: '' }
  ]);
  constructor(
    httpService: HttpService<any>,
    private snackBar: MatSnackBar,
    public http: Http
    ) {
    super(
      httpService,
      API_URL,
      (result) =>  result.data
    )
  }
  getExhibitor (id: number) {
    this.baseUrl = getUrlConfiguration().gondolasUrl;
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  getExhibitorById (id: number, token: string) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    this.baseUrl = getUrlConfiguration().gondolasUrl;
    return this.http.get(`${this.baseUrl}/${id}`, { headers: headers })
  }
  getProductsBy (queryName: string) {
    this.baseUrl = getUrlConfiguration().productsUrl;
    const paramObject = {
      name: queryName,
      category: this.model.category,
      brand: this.model.brands.map(brand => brand.id).join(',')
    }
    const urlQueryString = QueryOptions.toQueryString(paramObject);
    return this.httpClient.get(`${this.baseUrl}?${urlQueryString}`)
  }
  createExhibitor () {
    console.log('creating exhibitor - ', this.model);

    const formData = new FormData();
    this.baseUrl = getUrlConfiguration().gondolasUrl;

    if (this.model.files) {
      this.model.files.forEach(file => {
        formData.append(`image`, file);
      })
    }

    let cells = [];
    if (this.model.cells.length) {
      cells = [...this.model.cells.map(cell => {
        return {
          x: cell.x,
          y: cell.y,
          side: cell.side.id
        }
      })]
    }

    let brands = [];
    if (this.model.brands.length) {
      brands = [...this.model.brands.map(brand => {
        return { brandId: brand.id }
      })]
    }

    let businesses = [];
    if (this.model.establishments.length) {
      businesses = [...this.model.establishments.map(e => {
        return { businessId: e.id }
      })]
    }

    formData.append('name', this.model.name);
    formData.append('width', this.model.width.toString());
    formData.append('height', this.model.height.toString());
    formData.append('category', this.model.category.toString());
    formData.append('gondolaType', this.model.gondolaType.toString());
    formData.append('cells', JSON.stringify(cells));
    formData.append('gondolaBrand', JSON.stringify(brands));
    formData.append('gondolaBusiness', JSON.stringify(businesses));

    this.httpClient.post( this.baseUrl, formData)
      .subscribe(result => {
        this.snackBar.open('Creado exitosamente.', 'Ok', { duration: 3500 });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok',  { duration: 3500 });
      });
  }
  updateExhibitor (id: string) {
    console.log('updating exhibitor - ', this.model);

    const formData = new FormData();
    this.baseUrl = getUrlConfiguration().gondolasUrl;

    if (this.model.files) {
      this.model.files.forEach(file => {
        formData.append(`image`, file);
      })
    }

    let cells = [];
    if (this.model.cells.length) {
      cells = [...this.model.cells.map(cell => {
        const payload = {
          id: cell.id,
          x: cell.x,
          y: cell.y,
          side: cell.side.id
        }
        if (!cell.id) delete payload.id;
        return payload;
      })]
    }

    let brands = [];
    if (this.model.brands.length) {
      brands = [...this.model.brands.map(brand => {
        return brand.gondolaBrandId ? { id: brand.gondolaBrandId, brandId: brand.id } : { brandId: brand.id };
      })]
    }

    let businesses = [];
    if (this.model.establishments.length) {
      businesses = [...this.model.establishments.map(e => {
        return e.gondolaBusinessId ? { id: e.gondolaBusinessId, businessId: e.id } : { businessId: e.id }
      })]
    }

    formData.append('name', this.model.name);
    formData.append('width', this.model.width.toString());
    formData.append('height', this.model.height.toString());
    formData.append('category', this.model.category.toString());
    formData.append('gondolaType', this.model.gondolaType.toString());
    formData.append('cells', JSON.stringify(cells));
    formData.append('gondolaBrand', JSON.stringify(brands));
    formData.append('gondolaBusiness', JSON.stringify(businesses));

    this.httpClient.put( `${this.baseUrl}/${id}`, formData)
      .subscribe(result => {
        this.snackBar.open('Actualizado exitosamente.', 'Ok', { duration: 3500 });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok',  { duration: 3500 });
      });
  }
}
