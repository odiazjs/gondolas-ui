import { NgModule } from '@angular/core';
import { CrudCatalogsComponent } from './crud-catalogs.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { DataCatalogsService } from './services/data-catalogs.service';
import { MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatSortModule, MatButtonModule, MatSlideToggleModule, MatGridListModule, MatListModule, MatCardModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';
import { GoogleMapsComponent } from '../googleMaps/googleMaps.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        ImageUploadModule.forRoot(),
        MatSlideToggleModule,
        MatGridListModule,
        MatListModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBzmfkVDm6_Aw9ZhEVWsKoi2MCVn2ZXZys',
            libraries: ['places']
        }),
    ],
    providers: [
        DataCatalogsService
    ],
    entryComponents: [
        AddDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent,
        GoogleMapsComponent
    ],
    declarations: [
        AddDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent,
        GoogleMapsComponent
    ]
})

export class CrudCatalogsComponentModule {
    static forRoot() {
        return CrudCatalogsComponent
    }
}