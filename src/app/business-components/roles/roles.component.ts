import { Component, OnInit } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  catalogsTitle = 'Roles';
  apiUrl = getUrlConfiguration().rolesUrl;
  columns = ['id', 'nombre', 'actions'];
  imageUploadConfig = null;
  constructor() { }
 
  ngOnInit(): void { }
}
