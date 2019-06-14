import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import {
  getUrlConfiguration,
  RequestService,
  HttpService
} from "@asura-media/ui-sdk";
import { MatSnackBar } from "@angular/material";
import { Store } from "@ngxs/store";
import { CatalogState } from "../../ngxs/catalogs.state";
import { Catalog } from "../../crud-catalogs/models/catalog";

const API_URL = getUrlConfiguration().productsUrl;

@Injectable()
export class DataService extends RequestService<Product[]> {
  dialogData: any;
  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  brands$: Observable<Catalog[]>;
  flavors$: Observable<Catalog[]>;
  categories$: Observable<Catalog[]>;
  presentations$: Observable<Catalog[]>;

  defaultUserTypes = [
    { appType: "web", checked: null },
    { appType: "mobile", checked: null }
  ];

  constructor(
    public httpService: HttpService<any>,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    super(httpService, API_URL, result => {
      return result.data;
    });
    this.brands$ = CatalogState.stateSelector("brands", this.store);
    this.flavors$ = CatalogState.stateSelector("flavors", this.store);
    this.categories$ = CatalogState.stateSelector("categories", this.store);
    this.presentations$ = CatalogState.stateSelector(
      "presentations",
      this.store
    );
  }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllIssues(): void {
    this.baseUrl = getUrlConfiguration().productsUrl;
    this.getList()
      .pipe()
      .subscribe((data: any) => {
        this.dataChange.next(data);
      });
  }

  addIssue(product: Product): void {
    const formData = new FormData();

    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
      if (key === "sides") {
        product[key].forEach(side => {
          formData.append(side.name, side[side.name]);
        });
      }
    });

    formData.delete("imageUploadConfig");
    formData.append("sides", JSON.stringify(product["sides"]));

    this.baseUrl = getUrlConfiguration().productsUrl;
    this.create(formData as any).subscribe(
      data => {
        this.dialogData = product;
        this.snackBar.open("Creado exitosamente.", "Ok", { duration: 3500 });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open('Ocurrio un error. Detalles: ' + err.name + ' ' + err.message, 'Ok',  { duration: 3500 });
      }
    );
  }

  updateIssue(product: Product): void {
    product.brand = product.brand["id"];
    product.category = product.category["id"];
    product.flavor = product.flavor["id"];
    product.presentation = product.presentation["id"];

    let formData = new FormData();

    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
      if (key === "sides") {
        product[key].forEach(side => {
          formData.append(side.name, side[side.name]);
        });
      }
    });

    formData.delete("imageUploadConfig");
    formData.append("sides", JSON.stringify(product["sides"]));

    this.baseUrl = getUrlConfiguration().productsUrl;
    this.update(formData, product.id).subscribe(
      data => {
        this.dialogData = product;
        this.snackBar.open("Actualizado exitosamente.", "Ok", {
          duration: 3500
        });
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

export interface Product {
  id?: string;
  name: string;
  weightUnit: string;
  weight: number;
  code: string;
  flavor: number;
  category: number;
  brand: number;
  presentation: number;
  sides: Side[];
  imageUploadConfig?: ImageUploadConfig;
}

export interface Side {
  name?: string;
  width?: number;
  height?: number;
  imageName?: string;
  Front?: ImageBitmapSource;
  Back?: ImageBitmapSource;
  RightSide?: ImageBitmapSource;
  LeftSide?: ImageBitmapSource;
}

export interface ImageUploadConfig {
  max: number;
  url: string;
  headers: Object;
  btnText: string;
  boxMessage: string;
  extensions: string[];
  previousFiles: string[];
  removed: () => void;
  onFinished: (event) => void;
  onStateChanged: () => void;
}
