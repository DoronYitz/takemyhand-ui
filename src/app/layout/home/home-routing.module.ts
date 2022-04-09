import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { VolunteerComponent } from './volunteer/volunteer.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
