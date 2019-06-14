import { StateContext, Action, State, Selector, Store } from "@ngxs/store";
import { map } from "rxjs/operators";
import { CatalogsService } from "./catalogs.service";
import { GetAll } from "./catalogs.actions";
import { Catalog } from "../crud-catalogs/models/catalog";

@State<Dictionary<Catalog[]>>({
    name: 'catalogs'
})
export class CatalogState {

    constructor(
        private store: Store,
        private catalogsService: CatalogsService) { }

    @Action(GetAll)
    getAll({ patchState }: StateContext<Dictionary<Catalog[]>>) {
        return this.catalogsService.getAll().pipe(
            map((result: any) => {
                const dict = {};
                dict['roles'] = result[0];
                dict['companies'] = result[1];
                dict['jobTitles'] = result[2];
                dict['phoneCompanies'] = result[3];
                dict['formats'] = result[4];
                dict['chains'] = result[5];
                dict['channels'] = result[6];
                dict['cities'] = result[7];
                dict['states'] = result[8];
                dict['brands'] = result[9];
                dict['categories'] = result[10];
                dict['flavors'] = result[11];
                dict['presentations'] = result[12];
                patchState(dict);
                return dict;
            }
            ))
    }

    @Selector()
    static catalogs(state: Dictionary<Catalog[]>) {
        return state;
    }

    @Selector()
    static catalogsOfType(state: Dictionary<Catalog[]>) {
        return (type: string) => {
            return state[type];
        }
    }

    static stateSelector(type: string, store: Store) {
        return store.select(CatalogState.catalogsOfType).pipe(
            map(filterFn => {
                return filterFn(type)
            })
        )
    }

}

export interface Dictionary<T> {
    [key: string]: T
}
