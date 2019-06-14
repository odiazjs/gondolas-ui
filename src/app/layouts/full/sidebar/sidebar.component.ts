import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { parseJwt, AuthStateModel } from '@asura-media/ui-sdk';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { startWith, delay, take } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  userInfo: any = {};

  private _mobileQueryListener: () => void;
  @Select(state => state.auth) authInfo$: Observable<AuthStateModel>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private store: Store
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getStore () {
    let a = null; 
    this.store.select(state => state.auth).pipe(take(1)).subscribe((y) => a = y); 
    return a;
  }

  setUsername () {
    let store = this.getStore()
    this.userInfo = parseJwt(store.token)    
  }

  ngAfterViewInit () {
    Observable.create().pipe(startWith(null), delay(150)).subscribe(() => { 
      this.setUsername();
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
