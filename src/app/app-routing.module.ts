import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ControlPanelComponent } from './admin-panel/control-panel/control-panel.component';
import { DriversComponent } from './admin-panel/drivers/drivers.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { ParcelsComponent } from './admin-panel/parcels/parcels.component';
import { VolunteersComponent } from './admin-panel/volunteers/volunteers.component';
import { RoleGuard } from './guards/role.guard';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { VolunteerComponent } from './volunteer/volunteer.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
    children: [
      { path: 'parcels', component: ParcelsComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'control', component: ControlPanelComponent },
      { path: 'volunteers', component: VolunteersComponent },
      { path: 'events', component: EventsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
