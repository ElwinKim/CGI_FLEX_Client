import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MachinelistPageRoutingModule } from './machinelist-routing.module';

import { MachinelistPage } from './machinelist.page';
import { MachineStatus } from '../components/machine-status/machine-status.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MachinelistPageRoutingModule,
    MachineStatus
  ],
  declarations: [MachinelistPage]
})
export class MachinelistPageModule {}
