import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  brand = {};
  catalogsTitle = 'Categorias';
  apiUrl = getUrlConfiguration().categoriesUrl;
  columns = ['id', 'nombre', 'actions'];
  imageUploadConfig = null;

  constructor(public dataService: DataCatalogsService) { }

  ngOnInit(): void { }
}
