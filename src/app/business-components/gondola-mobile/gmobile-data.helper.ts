import { ExhibitorDataService } from '../exhibitor/exhibitor.data.service';
import { Product, Side } from '../products/services/data.service';

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
}

export const gondolaDataHelper = new GondolaDataHelper()
