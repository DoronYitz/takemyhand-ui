import { NgModule } from '@angular/core';

// Shared and routing
import { AdminRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

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

import { environment } from 'src/environments/environment';

// Components
import { AdminPanelComponent } from './admin-panel.component';
import { AlgoDialogComponent } from './components/control-panel/algo-dialog/algo-dialog.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { FinishEventComponent } from './components/control-panel/finish-event/finish-event.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { DeleteEventComponent } from './components/events/delete-event/delete-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { EditSecretEventComponent } from './components/events/edit-secret-event/edit-secret-event.component';
import { EventsComponent } from './components/events/events.component';
import { AddParcelComponent } from './components/parcels/add-parcel/add-parcel.component';
import { DeleteParcelComponent } from './components/parcels/delete-parcel/delete-parcel.component';
import { EditParcelComponent } from './components/parcels/edit-parcel/edit-parcel.component';
import { ParcelsComponent } from './components/parcels/parcels.component';
import { UploadFileComponent } from './components/parcels/upload-file/upload-file.component';
import { AddVolunteerComponent } from './components/volunteers/add-volunteer/add-volunteer.component';
import { DeleteVolunteerComponent } from './components/volunteers/delete-volunteer/delete-volunteer.component';
import { EditVolunteerComponent } from './components/volunteers/edit-volunteer/edit-volunteer.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { MessageService } from './services/message.service';
import { VolunteerService } from '../../core/services/volunteer.service';

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
  ]
})
export class AdminModule {}
