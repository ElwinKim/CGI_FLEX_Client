import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachinelistPage } from './machinelist.page';

const routes: Routes = [
  {
    path: '',
    component: MachinelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachinelistPageRoutingModule {}
