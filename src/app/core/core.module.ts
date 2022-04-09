import { NgModule, Optional, SkipSelf } from '@angular/core';

import { LayoutModule } from '../layout/layout.module';

import { UserDataService } from './services/user-data.service';
import { AuthService } from './services/auth.service';
import { EventBusService } from './services/event-bus.service';
import { TokenStorageService } from './services/token-storage.service';
import { ToasterService } from './services/toaster.service';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { VolunteerService } from './services/volunteer.service';
import { ParcelService } from './services/parcel.service';
import { EventService } from './services/event.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        UserDataService,
        AuthService,
        EventBusService,
        TokenStorageService,
        ToasterService,
        VolunteerService,
        ParcelService,
        EventService,
      ],
    };
  }
}
