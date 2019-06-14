import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { gondolaDataHelper, GondolaDataHelper } from './gmobile-data.helper';
import { Component, OnInit, Inject, Optional, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExhibitorDataService } from '../exhibitor/exhibitor.data.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product--mobile-dialog',
  templateUrl: './product-mobile-dialog.html',
  styleUrls: ['./product-mobile-dialog.scss']
})
export class ProductMobileDialogComponent implements OnInit, AfterViewInit {
  imgUrl = getUrlConfiguration().imgUrl;
  gondolaData: GondolaDataHelper = gondolaDataHelper;
  constructor(
    public exhibitorDataService: ExhibitorDataService,
    public dialogRef: MatDialogRef<ProductMobileDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.gondolaData.exhibitorDataService = this.exhibitorDataService;
  }
  ngOnInit(): void {
    document.getElementsByClassName('mat-dialog-container');
  }
  ngAfterViewInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
