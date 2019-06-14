import { ArrayJoinPipe } from './../shared/pipes';
import { ProductMobileDialogComponent } from './gondola-mobile/product-mobile-dialog';
import { GondolaMobileComponent } from './gondola-mobile/gmobile.component';
import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { BusinessRoutes } from './business.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { FormatsComponent } from './formats/formats.component';

// ui sdk
import {
  UiSdkModule,
  AuthService,
  HttpService,
  FullNavtoolModule
} from '@asura-media/ui-sdk';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';


import { CrudComponentModule } from './crud/crud.module';
import { CrudCatalogsComponentModule } from './crud-catalogs/crud-catalogs.module';
import { ChainsComponent } from './chains/chains.component';
import { CompaniesComponent } from './companies/companies.component';
import { JobTitlesComponent } from './jobTitles/jobTitles.component';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BUSINESS_STATES } from './ngxs/states';
import { ChannelsComponent } from './channels/channels.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { FlavorsComponent } from './flavors/flavors.component';
import { PackingsComponent } from './packings/packings.component';
import { ProductsComponentModule } from './products/products.module';
import { GondolaComponent } from './gondola/gondola.component';
import { ProductDialogComponent } from './gondola/product-dialog';

import { GridsterModule } from 'angular-gridster2';
import { ExhibitorComponent } from './exhibitor/exhibitor.component';
import { ExhibitorDataService } from './exhibitor/exhibitor.data.service';
import { ImageUploadModule } from 'angular2-image-upload';
import { HttpModule } from '@angular/http';
import { ExhibitorListComponentModule } from './exhibitor-list/exhibitor-list.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(BusinessRoutes),
    DemoMaterialModule,
    HttpModule,
    HttpClientModule,
    CdkTableModule,
    UiSdkModule,
    FullNavtoolModule,
    CrudComponentModule,
    CrudCatalogsComponentModule,
    ProductsComponentModule,
    ExhibitorListComponentModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([...BUSINESS_STATES]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth', 'catalogs']
    }),
    ImageUploadModule.forRoot(),
    GridsterModule
  ],
  providers: [
    HttpService,
    AuthService,
    ExhibitorDataService
  ],
  entryComponents: [
    ProductDialogComponent,
    ProductMobileDialogComponent
  ],
  declarations: [
    CrudComponentModule.forRoot(),
    CrudCatalogsComponentModule.forRoot(),
    DashboardComponent,
    RolesComponent,
    UsersComponent,
    FormatsComponent,
    ChainsComponent,
    ChannelsComponent,
    CompaniesComponent,
    JobTitlesComponent,
    EstablishmentsComponent,
    ProductsComponentModule.forRoot(),
    ExhibitorListComponentModule.forRoot(),
    GondolaComponent,
    GondolaMobileComponent,
    BrandsComponent,
    CategoriesComponent,
    FlavorsComponent,
    PackingsComponent,
    ExhibitorComponent,
    ProductDialogComponent,
    ProductMobileDialogComponent,
    ArrayJoinPipe
  ]
})
export class BusinessComponentsModule {
  constructor () {

  }
}
