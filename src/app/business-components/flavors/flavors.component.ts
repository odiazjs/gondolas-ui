import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-flavors',
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.scss']
})
export class FlavorsComponent implements OnInit {
  catalogsTitle = 'Sabores';
  apiUrl = getUrlConfiguration().flavorsUrl;
  columns = ['id', 'nombre', 'actions'];
  imageUploadConfig = null;
  constructor(private dataService: DataCatalogsService) { }
  ngOnInit(): void { }
}
