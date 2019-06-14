import { ExhibitorDataService } from './../exhibitor/exhibitor.data.service';
import { Product, Side } from './../products/services/data.service';
import { tap, debounceTime, debounce, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export class GondolaDataHelper {
  sides: Side[] = [];
  products: Product[] = [];
  sideSizeRate = 2;

  /** Product Dialog  */
  queryString: string;
  productList: Product[] = [];
  selectedSide: Side;

  exhibitorDataService: ExhibitorDataService;

  constructor() {

  }

  selectSide(side: Side) {
    this.selectedSide = Object.assign({}, side)
  }
  makeQuery(value) {
    if (this.queryString.length) {
      this.exhibitorDataService.getProductsBy(this.queryString)
          .pipe(
            tap((result: any) => {
              this.productList = [...result.data];
            })
          ).subscribe()
    } else {
      this.productList = [];
      this.selectedSide = null;
    }
  }
}

export const gondolaDataHelper = new GondolaDataHelper()
