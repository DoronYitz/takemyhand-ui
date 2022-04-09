import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { AboutPicutresComponent } from './components/landing/about/about-picutres/about-picutres.component';
import { AboutTextComponent } from './components/landing/about/about-text/about-text.component';
import { EventCardComponent } from './components/landing/event-card/event-card.component';
import { HeaderComponent } from './components/landing/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProcessDetailsComponent } from './components/landing/process-details/process-details.component';
import { LoginComponent } from './components/login/login.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { HomeRoutingModule } from './home-routing.module';

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
