import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineStatusPage } from './machine-status.page';

const routes: Routes = [
  {
    path: '',
    component: MachineStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachineStatusPageRoutingModule {}
