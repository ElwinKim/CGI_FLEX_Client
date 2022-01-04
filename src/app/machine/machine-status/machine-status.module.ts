import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MachineStatusPageRoutingModule } from './machine-status-routing.module';
import { MachineStatusPage } from './machine-status.page';
import { StatusList } from './components/status-list/status-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MachineStatusPageRoutingModule,
    StatusList
  ],
  declarations: [MachineStatusPage]
})
export class MachineStatusPageModule {}
