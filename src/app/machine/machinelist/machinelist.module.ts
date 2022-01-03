import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MachinelistPageRoutingModule } from './machinelist-routing.module';

import { MachinelistPage } from './machinelist.page';
import { MachineList } from '../../components/machine-list/machine-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MachinelistPageRoutingModule,
    MachineList
  ],
  declarations: [MachinelistPage]
})
export class MachinelistPageModule {}
