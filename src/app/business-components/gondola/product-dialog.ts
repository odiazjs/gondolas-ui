import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { gondolaDataHelper, GondolaDataHelper } from './gondola-data.helper';
import { Component, OnInit, Inject, Optional, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExhibitorDataService } from '../exhibitor/exhibitor.data.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.html',
  styleUrls: ['./product-dialog.scss']
})
export class ProductDialogComponent implements OnInit, AfterViewInit {
  imgUrl = getUrlConfiguration().imgUrl;
  gondolaData: GondolaDataHelper = gondolaDataHelper;
  productSearchSubject: Subject<string> = new Subject();
  constructor(
    public exhibitorDataService: ExhibitorDataService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.gondolaData.exhibitorDataService = this.exhibitorDataService;
  }
  ngOnInit(): void {
    this.data = gondolaDataHelper.selectedSide;
  }
  ngAfterViewInit(): void {
    this.productSearchSubject
      .pipe(
        debounceTime(1000)
      ).subscribe(searchTextValue => {
        if (searchTextValue.trim() === '') return;
        this.gondolaData.makeQuery(searchTextValue);
    });
  }
  onKeyUp (value: string) {
    this.productSearchSubject.next(value);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
