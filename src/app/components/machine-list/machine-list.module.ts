import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MachineListComponent } from './machine-list.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [MachineListComponent],
  exports: [MachineListComponent]
})

export class MachineList {}

