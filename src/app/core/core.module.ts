import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// # Strategy
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { authInterceptorProviders } from './interceptors/auth.interceptor';

// Modules
import { LayoutModule } from '../layout/layout.module';

// Guards
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

// Services
import { UserDataService } from './services/user-data.service';
import { AuthService } from './services/auth.service';
import { EventBusService } from './services/event-bus.service';
import { TokenStorageService } from './services/token-storage.service';
import { ToasterService } from './services/toaster.service';
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
        authInterceptorProviders,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
      ],
    };
  }
}
