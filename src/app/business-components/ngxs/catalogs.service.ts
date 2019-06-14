import { Injectable } from "@angular/core";
import { RequestService, HttpService, getUrlConfiguration } from "@asura-media/ui-sdk";
import { HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { Catalog } from "../users/users.service";

@Injectable()
export class CatalogsService extends RequestService<Catalog[]> {
    constructor(
        httpService: HttpService<HttpResponse<Catalog[]>>
    ) {
        super(
            httpService,
            '',
            (result) => { return result.data }
        )
    }

    getAll () {

        const roles$ = this.getRoles();
        const companies$ = this.getCompanies();
        const jobTitles$ = this.getJobTitles();
        const phoneCompanies$ = this.getPhoneCompanies();
        const formats$ = this.getFormats();
        const chains$ = this.getChains();
        const channels$ = this.getChannels();
        const cities$ = this.getCities();
        const states$ = this.getStates();
        const brands$ = this.getBrands();
        const categories$ = this.getCategories();
        const flavors$ = this.getFlavors();
        const presentations$ = this.getPresentations();

        return forkJoin(
            roles$,
            companies$,
            jobTitles$,
            phoneCompanies$,
            formats$,
            chains$,
            channels$,
            cities$,
            states$,
            brands$,
            categories$,
            flavors$,
            presentations$
        ).pipe(
            map((result) => {
                return result;
            })
        )
    }

    getRoles() {
        this.baseUrl = getUrlConfiguration().rolesUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getCompanies () {
        this.baseUrl = getUrlConfiguration().companiesUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getJobTitles () {
        this.baseUrl = getUrlConfiguration().jobTitlesUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getPhoneCompanies () {
        this.baseUrl = getUrlConfiguration().phoneCompaniesUrl;
        return this.getList().pipe(
          map((result) => {
            const list: Catalog[] = [
              { id: 1, isActive: true, name: 'Claro', description: '' },
              { id: 2, isActive: true, name: 'Tigo', description: '' },
              { id: 3, isActive: true, name: 'Movistar', description: ''}
            ]
              return [...list]
            })
        )
    }

    getFormats () {
        this.baseUrl = getUrlConfiguration().formatsUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getChains () {
        this.baseUrl = getUrlConfiguration().chainsUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getChannels () {
        this.baseUrl = getUrlConfiguration().channelsUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getCities () {
        this.baseUrl = getUrlConfiguration().citiesUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getStates () {
        this.baseUrl = getUrlConfiguration().statesUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getBrands () {
        this.baseUrl = getUrlConfiguration().brandsUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getCategories () {
        this.baseUrl = getUrlConfiguration().categoriesUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getFlavors () {
        this.baseUrl = getUrlConfiguration().flavorsUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

    getPresentations () {
        this.baseUrl = getUrlConfiguration().presentationsUrl;
        return this.getList().pipe(
            map((result) => {
                return [...result]
            })
        )
    }

}
