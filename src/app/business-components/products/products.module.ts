import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { DataService } from './services/data.service';
import { MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatSortModule, MatButtonModule, MatRadioModule, MatCheckboxModule, MatSlideToggleModule, MatGridTile, MatGridListModule, MatListModule, MatCardModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';

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
        MatSlideToggleModule,
        MatGridListModule,
        MatListModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        ImageUploadModule.forRoot(),
    ],
    providers: [
        DataService
    ],
    entryComponents: [
        AddDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent
    ],
    declarations: [
        AddDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent
    ]
})

export class ProductsComponentModule {
    static forRoot() {
        return ProductsComponent
    }
}