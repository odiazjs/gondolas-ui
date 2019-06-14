import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthComponent } from './business-components/auth/auth.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          './business-components/business.module#BusinessComponentsModule'
      },
      {
        path: 'dashboard',
        loadChildren: './starter/starter.module#StarterModule'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];
