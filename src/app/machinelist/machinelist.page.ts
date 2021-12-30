import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { popoverController } from '@ionic/core';
import { PopComponentComponent } from '../components/pop-component/pop-component.component';
import { PopComponent } from '../components/pop-component/pop-component.module';

@Component({
  selector: 'app-machinelist',
  templateUrl: './machinelist.page.html',
  styleUrls: ['./machinelist.page.scss'],
})
export class MachinelistPage implements OnInit {

  constructor(public popoverContorller: PopoverController) { }

  ngOnInit() {
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
