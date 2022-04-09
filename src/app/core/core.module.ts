import { NgModule } from '@angular/core';

import { UserDataService } from './services/user-data.service';
import { AuthService } from './services/auth.service';
import { EventBusService } from './services/event-bus.service';
import { TokenStorageService } from './services/token-storage.service';
import { ToasterService } from './services/toaster.service';

@NgModule({
  declarations: [],
  imports: [],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        UserDataService,
        AuthService,
        EventBusService,
        TokenStorageService,
        ToasterService,
      ],
    };
  }
}
