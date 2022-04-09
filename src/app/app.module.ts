// Core
import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';

// Etc
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
  ],
  providers: [
    authInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {}
}
