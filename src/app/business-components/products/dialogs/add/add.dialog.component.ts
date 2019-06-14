import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) {}

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngAfterViewInit(): void {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  select (item) {
    console.log(item)
  }

  submit(ev) {
    console.log(ev)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(args?: any): void {
    this.dataService.addIssue(this.data);
  }
}
