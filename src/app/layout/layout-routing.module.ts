import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '../core/guards/role.guard';

/**
 * Lazy loading all modules
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
    loadChildren: () =>
      import('./admin-panel/admin-panel.module').then((m) => m.AdminModule),
  },
  {
    path: 'userpanel',
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'driver',
    },
    loadChildren: () =>
      import('./user-panel/user-panel.module').then((m) => m.UserpanelModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
