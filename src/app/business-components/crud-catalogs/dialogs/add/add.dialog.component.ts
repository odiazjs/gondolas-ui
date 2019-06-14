import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataCatalogsService } from '../../services/data-catalogs.service';
import { Catalog } from '../../models/catalog';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit {
  imageUploadDefaultConfig = {
    previousFiles: [],
    removed: () => { console.log('removed!') },
    onFinished: (event) => {
      this.data.entity.files = [...[event.file]];
    },
    onStateChanged: () => { console.log('state changed!') }
  }
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataCatalogsService
  ) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit () {

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  select () {
    
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(args?: any): void {
    this.dataService.addCatalog(this.data);
  }
}
