import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-panel-routing.module';

// Angular material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// 3rd party moudles
import { ChartsModule } from 'ng2-charts';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AddEventComponent } from './events/add-event/add-event.component';
import { DeleteEventComponent } from './events/delete-event/delete-event.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { EditSecretEventComponent } from './events/edit-secret-event/edit-secret-event.component';
import { EventsComponent } from './events/events.component';
import { AddParcelComponent } from './parcels/add-parcel/add-parcel.component';
import { DeleteParcelComponent } from './parcels/delete-parcel/delete-parcel.component';
import { EditParcelComponent } from './parcels/edit-parcel/edit-parcel.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { UploadFileComponent } from './parcels/upload-file/upload-file.component';
import { AddVolunteerComponent } from './volunteers/add-volunteer/add-volunteer.component';
import { DeleteVolunteerComponent } from './volunteers/delete-volunteer/delete-volunteer.component';
import { EditVolunteerComponent } from './volunteers/edit-volunteer/edit-volunteer.component';
import { VolunteersComponent } from './volunteers/volunteers.component';

import { environment } from 'src/environments/environment';
import { AdminPanelComponent } from './admin-panel.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AlgoDialogComponent } from './control-panel/algo-dialog/algo-dialog.component';
import { FinishEventComponent } from './control-panel/finish-event/finish-event.component';
import { SharedModule } from 'src/app/shared/shared.module';

const config: SocketIoConfig = { url: environment.backendUrl, options: {} };

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    ChartsModule,
    SocketIoModule.forRoot(config),
  ],
  declarations: [
    AdminPanelComponent,
    AlgoDialogComponent,
    FinishEventComponent,
    ControlPanelComponent,
    AddEventComponent,
    DeleteEventComponent,
    EditEventComponent,
    EditSecretEventComponent,
    EventsComponent,
    AddParcelComponent,
    DeleteParcelComponent,
    EditParcelComponent,
    UploadFileComponent,
    ParcelsComponent,
    AddVolunteerComponent,
    DeleteVolunteerComponent,
    EditVolunteerComponent,
    VolunteersComponent,
  ],
})
export class AdminModule {}
