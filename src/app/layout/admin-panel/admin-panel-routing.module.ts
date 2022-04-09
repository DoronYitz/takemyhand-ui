import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guard
import { RoleGuard } from 'src/app/core/guards/role.guard';

// Components
import { AdminPanelComponent } from './admin-panel.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { EventsComponent } from './components/events/events.component';
import { ParcelsComponent } from './components/parcels/parcels.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
    children: [
      {
        path: '',
        redirectTo: 'parcels',
        pathMatch: 'full',
      },
      { path: 'parcels', component: ParcelsComponent },
      { path: 'control', component: ControlPanelComponent },
      { path: 'volunteers', component: VolunteersComponent },
      { path: 'events', component: EventsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
