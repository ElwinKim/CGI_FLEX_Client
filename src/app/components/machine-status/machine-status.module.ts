import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MachineStatusComponent } from './machine-status.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [MachineStatusComponent],
  exports: [MachineStatusComponent]
})
export class MachineStatus {}

