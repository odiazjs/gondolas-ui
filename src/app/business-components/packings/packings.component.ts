import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-packings',
  templateUrl: './packings.component.html',
  styleUrls: ['./packings.component.scss']
})
export class PackingsComponent implements OnInit {
  catalogsTitle = 'Presentaciones';
  apiUrl = getUrlConfiguration().presentationsUrl;
  columns = ['id', 'nombre', 'actions'];
  imageUploadConfig = null;
  constructor(private dataService: DataCatalogsService) { }
  ngOnInit(): void { }
}
