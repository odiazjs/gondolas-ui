import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  catalogsTitle = 'Empresas';
  apiUrl = getUrlConfiguration().companiesUrl;
  columns = ['id', 'nombre', 'actions'];
  imageUploadConfig = null;
  constructor() { }
 
  ngOnInit(): void { }
}
