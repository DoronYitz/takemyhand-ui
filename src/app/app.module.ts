// Core
import { NgModule, OnInit } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Etc
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';

// # Strategy
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule.forRoot(), SharedModule, AppRoutingModule],
  providers: [
    authInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {}
}
