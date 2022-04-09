import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { VolunteerComponent } from './volunteer/volunteer.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AboutTextComponent } from './landing/about/about-text/about-text.component';
import { AboutPicutresComponent } from './landing/about/about-picutres/about-picutres.component';
import { EventCardComponent } from './landing/event-card/event-card.component';
import { HeaderComponent } from './landing/header/header.component';
import { ProcessDetailsComponent } from './landing/process-details/process-details.component';

@NgModule({
  declarations: [
    VolunteerComponent,
    LoginComponent,
    LandingComponent,
    AboutTextComponent,
    AboutPicutresComponent,
    EventCardComponent,
    HeaderComponent,
    ProcessDetailsComponent,
  ],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
