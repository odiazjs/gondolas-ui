import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  catalogsTitle = 'Marcas';
  apiUrl = getUrlConfiguration().brandsUrl;
  columns = ['id', 'nombre', 'imagen', 'actions'];
  imageUploadConfig = {
    max: 1,
    url: '',
    headers: {'Cache-Control': 'no-cache'},
    btnText: 'Seleccionar imagen',
    boxMessage: 'Arrastrar imagen aqui',
    extensions: ['jpg','png','gif']
  }
  
  constructor(public dataService: DataCatalogsService) { }

  ngOnInit(): void { }
}
