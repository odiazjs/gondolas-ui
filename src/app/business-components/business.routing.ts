import { GondolaMobileComponent } from './gondola-mobile/gmobile.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { FormatsComponent } from './formats/formats.component';
import { ChainsComponent } from './chains/chains.component';
import { CompaniesComponent } from './companies/companies.component';
import { JobTitlesComponent } from './jobTitles/jobTitles.component';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { ChannelsComponent } from './channels/channels.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { FlavorsComponent } from './flavors/flavors.component';
import { PackingsComponent } from './packings/packings.component';
import { ProductsComponent } from './products/products.component';
import { GondolaComponent } from './gondola/gondola.component';
import { ExhibitorComponent } from './exhibitor/exhibitor.component';
import { ExhibitorListComponent } from './exhibitor-list/exhibitor-list.component';

export const BusinessRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'formats',
    component: FormatsComponent
  },
  {
    path: 'chains',
    component: ChainsComponent
  },
  {
    path: 'channels',
    component: ChannelsComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent
  },
  {
    path: 'jobtitles',
    component: JobTitlesComponent
  },
  {
    path: 'establishments',
    component: EstablishmentsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'exhibitors',
    component: ExhibitorListComponent
  },
  {
    path: 'exhibitor',
    component: ExhibitorComponent
  },
  {
    path: 'exhibitor/:id',
    component: ExhibitorComponent
  },
  {
    path: 'gondola-mobile/:id/:token',
    component: GondolaMobileComponent
  },
  {
    path: 'brands',
    component: BrandsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'flavors',
    component: FlavorsComponent
  },
  {
    path: 'packings',
    component: PackingsComponent
  }
];
