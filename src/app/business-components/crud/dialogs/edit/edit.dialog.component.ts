import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { User, Registration } from '../../../users/users.service';
import { DataCatalogsService } from '../../../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    public dataCatalogsService: DataCatalogsService
  ) { }

  ngOnInit () {
    this.data.registrations.forEach(registration => {
      registration.checked = true;
    })
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  resolveChecked (registration: Registration) {
    const existing = this.data.registrations.filter(r => registration.appType === r.appType);
    return existing.length ? true : false
  }

  toggle(event, appType) {
    if (event.checked && this.data.registrations.indexOf(appType) === -1) {
      this.data.registrations.push({appType: appType})
    } else {
      this.data.registrations = [...this.data.registrations.filter(r => r.appType !== appType)]
    }
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }
}
