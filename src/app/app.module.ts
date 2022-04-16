// Core
import { NgModule, OnInit } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule.forRoot(), SharedModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {}
}
