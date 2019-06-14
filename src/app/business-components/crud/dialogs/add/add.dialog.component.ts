import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../users/users.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  color = 'primary';
  checked = false;
  disabled = false;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dataService: DataService
  ) {

    const handler = {
      get: (target, name) => {
        return target.hasOwnProperty(name) ? target[name] : null;
      }
    };

    this.data = new Proxy({registrations: [], device: {}}, handler);
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

  select (item) {
    console.log(item)
  }

  toggle(event, appType) {
    if (event.checked && this.data.registrations.indexOf(appType) === -1) {
      this.data.registrations.push({appType: appType})
    } else {
      this.data.registrations = [...this.data.registrations.filter(r => r.appType !== appType)]
    }
    console.log('registrations', this.data)
  }

  submit(ev) {
    console.log(ev)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(args?:any): void {
    this.dataService.addIssue(this.data);
  }
}
