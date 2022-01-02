import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMachine } from 'src/shared/models/Machine';
import { PopComponentComponent } from '../../components/pop-component/pop-component.component';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-machinelist',
  templateUrl: './machinelist.page.html',
  styleUrls: ['./machinelist.page.scss'],
})
export class MachinelistPage implements OnInit {

  machines: any;
  constructor(public popoverContorller: PopoverController, private machinesService: MachinesService) {
  }

  ngOnInit() {
    this.machinesService.getMachinesInfo().subscribe(res => {
      this.machines = res;
      console.log(this.machines);
    }, error => {
      console.log(error);
    });
  }

  async presentPopover(ev: any){
    const popover = await this.popoverContorller.create({
      component: PopComponentComponent,
      event: ev,
      translucent: true,
      dismissOnSelect: true
    });
    await popover.present();
  }
}
