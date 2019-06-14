import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '@asura-media/ui-sdk';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private store: Store) { }
  logoff() {
    this.store.dispatch(new Navigate(['/auth'])).subscribe()
  }
}
