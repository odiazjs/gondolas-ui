import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetAll } from '../ngxs/catalogs.actions';
import { CatalogState, Dictionary } from '../ngxs/catalogs.state';
import { Observable } from 'rxjs';
import { Catalog } from '../crud-catalogs/models/catalog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(CatalogState.catalogs) catalogs$: Observable<Dictionary<Catalog[]>>;
  constructor (private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(new GetAll()).subscribe()
  }

}
