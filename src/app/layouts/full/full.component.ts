import { ActivatedRoute } from '@angular/router';

import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
  OnInit
} from '@angular/core';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, OnInit, AfterViewInit {

  isMobile: boolean = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  title = 'Gondola Virtual UI';

  navtoolConfig: any = {
    toolbarOpts: {
        title: 'Asura Media UI Sdk'
    },
    userInfo: {
      name: 'Oscar Diaz',
      imagePath: 'assets/images/users/user1.png'
    },
    menuItems: [
      { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
      { state: 'roles', type: 'link', name: 'Roles', icon: 'crop_7_5' },
      { state: 'users', type: 'link', name: 'Usuarios', icon: 'view_comfy' },
      { state: 'formats', type: 'link', name: 'Formatos', icon: 'view_list' },
    ]
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public activatedRoute: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.isMobile = window.location.pathname.indexOf('gondola-mobile') > 0;
  }
  ngAfterViewInit() {

  }
}
