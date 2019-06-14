import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-formats',
  templateUrl: './formats.component.html',
  styleUrls: ['./formats.component.scss']
})
export class FormatsComponent implements OnInit {
  catalogsTitle = 'Formatos';
  apiUrl = getUrlConfiguration().formatsUrl;
  columns = ['id', 'nombre', 'imagen', 'actions'];
  imageUploadConfig = {
    max: 1,
    url: '',
    headers: {'Cache-Control': 'no-cache'},
    btnText: 'Seleccionar imagen',
    boxMessage: 'Arrastrar imagen aqui',
    extensions: ['jpg','png','gif']
  }
  
  constructor(private dataService: DataCatalogsService) { }

  ngOnInit(): void { }
}
