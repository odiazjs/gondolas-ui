import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import {
  JwtAuthModule,
  FullNavtoolModule,
  UiSdkModule,
  AuthService,
  HttpService,
  setUrlConfiguration
} from '@asura-media/ui-sdk';

import { endpointsUrl } from '../environments/config';

setUrlConfiguration(endpointsUrl as any);

import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { AuthComponent } from './business-components/auth/auth.component';
import { UsersService } from './business-components/users/users.service';

import { ReactiveFormsModule } from '@angular/forms';
import { CatalogsService } from './business-components/ngxs/catalogs.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    FullNavtoolModule,
    RouterModule.forRoot(AppRoutes),
    UiSdkModule,
    JwtAuthModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AuthService,
    HttpService,
    UsersService,
    CatalogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
