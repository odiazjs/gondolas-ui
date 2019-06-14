import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';

@Component({
  selector: 'app-job-titles',
  templateUrl: './jobTitles.component.html',
  styleUrls: ['./jobTitles.component.scss']
})
export class JobTitlesComponent implements OnInit {
  catalogsTitle = 'Puestos';
  apiUrl = getUrlConfiguration().jobTitlesUrl;
  columns = ['id', 'nombre', 'actions'];
  imageUploadConfig = null;
  constructor() { }
 
  ngOnInit(): void { }
}
