import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// User panel comp
import { UserPanelComponent } from './user-panel.component';

const routes: Routes = [
  {
    path: '',
    component: UserPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserpanelRoutingModule {}
