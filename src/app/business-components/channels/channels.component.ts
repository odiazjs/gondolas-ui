import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  catalogsTitle = 'Canales';
  apiUrl = getUrlConfiguration().channelsUrl;
  columns = ['id', 'nombre', 'actions'];
  imageUploadConfig = null;
  constructor(private dataService: DataCatalogsService) { }
  ngOnInit(): void { }
}
