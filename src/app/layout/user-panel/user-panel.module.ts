import { NgModule } from '@angular/core';

// Angular material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { UserpanelRoutingModule } from './user-panel-routing.module';
import { UserPanelComponent } from './user-panel.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserPanelComponent],
  imports: [
    SharedModule,
    UserpanelRoutingModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class UserpanelModule {}
