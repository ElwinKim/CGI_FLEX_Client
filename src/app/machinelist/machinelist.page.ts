import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverController } from '@ionic/core';
import { IMachine } from 'src/shared/models/Machine';
import { PopComponentComponent } from '../components/pop-component/pop-component.component';
import { PopComponent } from '../components/pop-component/pop-component.module';

@Component({
  selector: 'app-machinelist',
  templateUrl: './machinelist.page.html',
  styleUrls: ['./machinelist.page.scss'],
})
export class MachinelistPage implements OnInit {

  machines: IMachine[] = [];
  constructor(public popoverContorller: PopoverController) { }

  ngOnInit() {
    this.getMachinesInfo();
  }

  getMachinesInfo(){
    this.machines.push(new IMachine(
      1,
      'MC-07',
      'MATSURA VX100',
      'CYCLE OFF',
      'ABC123',
      1800,
      36000,
      3600,
      2088
    ));
    this.machines.push(new IMachine(
      2,
      'MC-08',
      'MATSURA VX100',
      'SETUP',
      'ABC123',
      1650,
      7800,
      3200,
      1000
    ));
    this.machines.push(new IMachine(
      3,
      'MC-09',
      'MATSURA VX100',
      'CYCLE ON',
      'ABC123',
      2100,
      18400,
      100,
      0
    ));
    this.machines.push(new IMachine(
      4,
      'MC-10',
      'MATSURA VX100',
      'OTHERS',
      'ABC123',
      3500,
      29400,
      200,
      0
    ));
  }

  async presentPopover(ev: any){
    const popover = await this.popoverContorller.create({
      component: PopComponentComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }
}
