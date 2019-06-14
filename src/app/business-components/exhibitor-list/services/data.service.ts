import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import {
  getUrlConfiguration,
  RequestService,
  HttpService
} from "@asura-media/ui-sdk";
import { MatSnackBar } from "@angular/material";
import { Store } from "@ngxs/store";

const API_URL = getUrlConfiguration().productsUrl;

@Injectable()
export class DataService extends RequestService<any[]> {
  dialogData: any;
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    public httpService: HttpService<any>,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    super(httpService, API_URL, result => {
      return result.data;
    });
  }

  get data(): any[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllIssues(): void {
    this.baseUrl = getUrlConfiguration().gondolasUrl;
    this.getList()
      .pipe()
      .subscribe((data: any) => {
        this.dataChange.next(data);
      });
  }

  deleteIssue(id: number): void {
    this.baseUrl = getUrlConfiguration().productsUrl;
    this.deleteById(id).subscribe(
      data => {
        this.snackBar.open("Eliminado exitosamente.");
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(
          "Ocurrio un error. Detalles: " + err.name + " " + err.message,
          "Ok",
          { duration: 3500 }
        );
      }
    );
  }
}

