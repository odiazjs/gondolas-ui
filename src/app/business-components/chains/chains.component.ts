import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { endpointsUrl } from '../../../environments/config';
import { DataCatalogsService } from '../crud-catalogs/services/data-catalogs.service';

@Component({
  selector: 'app-chains',
  templateUrl: './chains.component.html',
  styleUrls: ['./chains.component.scss']
})
export class ChainsComponent implements OnInit {
  catalogsTitle = 'Cadenas';
  apiUrl = getUrlConfiguration().chainsUrl;
  columns = ['id', 'nombre', 'imagen', 'actions'];
  imageUploadConfig = {
    max: 1,
    url: '',
    headers: { 'Cache-Control': 'no-cache' },
    btnText: 'Seleccionar imagen',
    boxMessage: 'Arrastrar imagen aqui',
    extensions: ['jpg', 'png', 'gif'],
    previousFiles: [`${endpointsUrl.imagesUrl}/imagejs1.png`],
    removed: () => { console.log('removed!') },
    onFinished: (event) => {
      console.log('finished!', event);
      this.dataService.files = [...[event.file]];
    },
    onStateChanged: () => { console.log('state changed!') }
  }
  constructor(private dataService: DataCatalogsService) { }
  ngOnInit(): void { }
}
