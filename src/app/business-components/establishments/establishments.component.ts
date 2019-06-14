import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-establishments',
    templateUrl: './establishments.template.html',
    styleUrls: ['./establishments.component.scss']
})
export class EstablishmentsComponent implements OnInit, AfterViewInit {

    catalogsTitle = 'Negocios';
    address = '';
    location = {};
    catalogs = {
        format: 1,
        chain: 1,
        channel: 1,
        city: 1,
        state: 1
    }
    apiUrl = getUrlConfiguration().businessUrl;
    columns = ['id', 'nombre', 'direccion', 'departamento', 'municipio', 'formato', 'cadena', 'canal'];
    imageUploadConfig = null;
    @Input() readonly: boolean;
    @Input() onCheckboxChange: { fn: (checked, row) => any, proto: any };
    @Input() onEstablishmentChange: Subject<any[]> = new Subject<any[]>();

    constructor() { }

    ngOnInit(): void {
      if (!this.readonly) {
        this.columns.push('actions')
      }
    }

    ngAfterViewInit() {

    }
}

