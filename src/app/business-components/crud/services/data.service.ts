import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { getUrlConfiguration, RequestService, HttpService } from '@asura-media/ui-sdk';
import { User, Catalog } from '../../users/users.service';
import { MatSnackBar } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { CatalogState, Dictionary } from '../../ngxs/catalogs.state';

let API_URL = getUrlConfiguration().usersUrl;

@Injectable()
export class DataService extends RequestService<User[]> {

  dialogData: any;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  defaultUserTypes = [
    { appType: "web", checked: null },
    { appType: "mobile", checked: null }
  ];

  @Select(CatalogState.catalogs) catalogs$: Observable<Dictionary<Catalog[]>>;

  constructor(
    public httpService: HttpService<any>,
    private snackBar: MatSnackBar
  ) {
    super(
      httpService,
      API_URL,
      (result) => { return result.data }
    )
  }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllIssues(): void {
    this.baseUrl = getUrlConfiguration().usersUrl;
    this.getList()
      .pipe()
      .subscribe((data: any) => {
        this.dataChange.next(data);
      });
  }

  addIssue(user: User): void {
    user.isSuperAdmin = false;
    this.baseUrl = getUrlConfiguration().registerUrl;
    this.create(user as any).subscribe(data => {
      this.dialogData = user;
      this.snackBar.open('Creado exitosamente.', 'Ok', { duration: 3500 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok',  { duration: 3500 });
      });
  }

  updateIssue(user: User): void {
    user.isSuperAdmin = false;
    this.baseUrl = getUrlConfiguration().usersUrl;
    this.update(user, user.id).subscribe(data => {
      this.dialogData = user;
      this.snackBar.open('Actualizado exitosamente.', 'Ok', { duration: 3500 });
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok', { duration: 3500 });
      }
    );
  }

  deleteIssue(id: number): void {
    this.baseUrl = getUrlConfiguration().usersUrl;
    this.deleteById(id).subscribe(data => {
      this.snackBar.open('Eliminado exitosamente.');
    },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok', { duration: 3500 });
      }
    );
  }
}




