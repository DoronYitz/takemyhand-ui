import { NgModule, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ParcelsComponent } from './admin-panel/parcels/parcels.component';
import { ControlPanelComponent } from './admin-panel//control-panel/control-panel.component';
import { VolunteersComponent } from './admin-panel//volunteers/volunteers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { EventsComponent } from './admin-panel/events/events.component';
import { AddEventComponent } from './admin-panel/events/add-event/add-event.component';
import { EditEventComponent } from './admin-panel/events/edit-event/edit-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteEventComponent } from './admin-panel/events/delete-event/delete-event.component';
import { UploadFileComponent } from './admin-panel/parcels/upload-file/upload-file.component';
import { DeleteParcelComponent } from './admin-panel/parcels/delete-parcel/delete-parcel.component';
import { AddParcelComponent } from './admin-panel/parcels/add-parcel/add-parcel.component';
import { EditParcelComponent } from './admin-panel/parcels/edit-parcel/edit-parcel.component';
import { EditVolunteerComponent } from './admin-panel/volunteers/edit-volunteer/edit-volunteer.component';
import { AddVolunteerComponent } from './admin-panel/volunteers/add-volunteer/add-volunteer.component';
import { DeleteVolunteerComponent } from './admin-panel/volunteers/delete-volunteer/delete-volunteer.component';
import { EditSecretEventComponent } from './admin-panel/events/edit-secret-event/edit-secret-event.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ChartsModule } from 'ng2-charts';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AlgoDialogComponent } from './admin-panel/control-panel/algo-dialog/algo-dialog.component';
import { FinishEventComponent } from './admin-panel/control-panel/finish-event/finish-event.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.backendUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    VolunteerComponent,
    LoginComponent,
    AdminPanelComponent,
    ParcelsComponent,
    ControlPanelComponent,
    VolunteersComponent,
    EventsComponent,
    AddEventComponent,
    EditEventComponent,
    DeleteEventComponent,
    UploadFileComponent,
    DeleteParcelComponent,
    AddParcelComponent,
    EditParcelComponent,
    EditVolunteerComponent,
    AddVolunteerComponent,
    DeleteVolunteerComponent,
    EditSecretEventComponent,
    UserPanelComponent,
    AlgoDialogComponent,
    FinishEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    FontAwesomeModule,
    NgbModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextFieldModule,
    MatTooltipModule,
    ChartsModule,
    MatProgressSpinnerModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }

  ngOnInit() {}
}
