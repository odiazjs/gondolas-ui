import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { ActivatedRoute } from '@angular/router';
import { Catalog } from './../crud-catalogs/models/catalog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ExhibitorDataService } from './exhibitor.data.service';
import { Observable, Subject } from 'rxjs';
import { CatalogState } from '../ngxs/catalogs.state';
import { Store } from '@ngxs/store';
import { Tile } from '../gondola/gondola.component';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-exhibitor',
  templateUrl: './exhibitor.component.html',
  styleUrls: ['./exhibitor.component.scss']
})
export class ExhibitorComponent implements OnInit {

  public prototype = this;
  submit: any;

  imageUploadConfig = {
    max: 1,
    url: '',
    headers: { 'Cache-Control': 'no-cache' },
    btnText: 'Seleccionar imagen',
    boxMessage: 'Arrastrar imagen aqui',
    extensions: ['jpg', 'png', 'gif'],
    previousFiles: [],
    removed: () => { console.log('removed!') },
    onFinished: (event) => {
      console.log('finished!', event);
      this.dataService.model.files = [...[event.file]];
    },
    onStateChanged: () => { console.log('state changed!') }
  }

  tiles: Tile[] = [];
  existingCells: any[] = [];
  brands$: Observable<Catalog[]>;
  categories$: Observable<Catalog[]>;

  brandsMultiselect = new FormControl();

  onEstablishmentChange: Subject<any[]> = new Subject<any[]>();

  constructor(
    public store: Store,
    public activatedRoute: ActivatedRoute,
    public dataService: ExhibitorDataService,
    public dataServiceTable: DataCatalogsService
  ) {
    this.brands$ = CatalogState.stateSelector("brands", this.store);
    this.categories$ = CatalogState.stateSelector("categories", this.store);
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
  ngOnInit(): void {

    this.brandsMultiselect.valueChanges.subscribe((brands) => {
      this.onBrandSelect(brands);
    })

    const { snapshot: { params: { id } } } = this.activatedRoute;

    if (id) {
      this.dataService.getExhibitor(id).subscribe((result: any) => {
        console.log(result);
        const exhibitor = Object.assign({}, result.data);
        this.imageUploadConfig.previousFiles = [`${getUrlConfiguration().imgUrl}${exhibitor.imageName}`];
        this.existingCells = [...result.data.cells];
        this.dataService.model.name = exhibitor.name;
        this.dataService.model.width = exhibitor.width;
        this.dataService.model.height = exhibitor.height;

        if (this.dataService.model.gondolaType && this.dataService.model.category) {
          this.dataService.model.gondolaType = exhibitor.gondolaType.id;
          this.dataService.model.category = exhibitor.category.id;
        }

        this.brandsMultiselect.setValue(exhibitor.gondolaBrand.map(gb => {
          gb.brand.gondolaBrandId = gb.id;
          return gb.brand;
        }));

        this.dataService.model.establishments = [...exhibitor.gondolaBusiness.map(gb => {
          gb.business.gondolaBusinessId = gb.id;
          this.onEstablishmentCheck(true, gb.business);
          return gb.business;
        })];

        setTimeout(() => {
          this.onEstablishmentChange.next([...this.dataService.model.establishments]);
        })

      })
    }

  }
  compareFn (f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }
  onEstablishmentCheck (checked, row) {
    if (checked) {
      row.checked = true;
      const existingRow =  this.dataService.model.establishments.find(e => e.id === row.id);
      if (!existingRow) {
        this.dataService.model.establishments.push(row);
      }
    } else {
      row.checked = false;
      this.dataService.model.establishments.splice(this.dataService.model.establishments.indexOf(row), 1);
    }
    console.log('onEstablishmentCheck', this.dataService.model);
  }
  onBrandSelect (brands) {
    if (this.dataService.model.brands.length) {
      this.dataService.model.brands = [...brands.map((brand, index) => {
        const modelBrand = this.dataService.model.brands[index];
        if (modelBrand) {
          if (brand.id === modelBrand.id) {
            brand.gondolaBrandId = modelBrand.gondolaBrandId;
          }
        }
        return brand;
      })];
    } else {
      this.dataService.model.brands = [...brands];
    }
    console.log('on brand select', this.dataService.model);
  }
  select(item) {
    console.log(item);
  }
  confirmAdd() {
    const { snapshot: { params: { id } } } = this.activatedRoute;
    if (id) {
      this.dataService.updateExhibitor(id);
    } else {
      this.dataService.createExhibitor();
    }
  }
  onNoClick() {

  }
}
