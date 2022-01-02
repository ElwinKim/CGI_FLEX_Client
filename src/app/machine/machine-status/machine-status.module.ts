import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MachineStatusPageRoutingModule } from './machine-status-routing.module';

import { MachineStatusPage } from './machine-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MachineStatusPageRoutingModule
  ],
  declarations: [MachineStatusPage]
})
export class MachineStatusPageModule {}
