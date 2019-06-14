import { NgModule } from '@angular/core';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { DataService } from './services/data.service';

import {
  MatIconModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule,
  MatSortModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';
import { ExhibitorListComponent } from './exhibitor-list.component';

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
        DeleteDialogComponent
    ],
    declarations: [
        DeleteDialogComponent
    ]
})

export class ExhibitorListComponentModule {
    static forRoot() {
        return ExhibitorListComponent
    }
}
