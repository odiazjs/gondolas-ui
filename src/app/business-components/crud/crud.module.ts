import { NgModule } from '@angular/core';
import { CrudComponent } from './crud.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { DataService } from './services/data.service';
import { MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatSortModule, MatButtonModule, MatRadioModule, MatCheckboxModule, MatSlideToggleModule, MatGridTile, MatGridListModule, MatListModule, MatCardModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        MatOptionModule
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

export class CrudComponentModule {
    static forRoot() {
        return CrudComponent
    }
}