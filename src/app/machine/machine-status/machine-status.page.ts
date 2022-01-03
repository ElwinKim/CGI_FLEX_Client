import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { PopComponentComponent } from 'src/app/components/pop-component/pop-component.component';
import { IMachine } from 'src/shared/models/Machine';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.page.html',
  styleUrls: ['./machine-status.page.scss'],
})
export class MachineStatusPage implements OnInit {

  machine: IMachine;
  id: string;
  bgColor: string;
  wrapperBg: string;
  statusAlarm: string;

  constructor(public popoverContorller: PopoverController, private machinesService: MachinesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMachine();
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

  async getMachine(){
    this.id = this.route.snapshot.paramMap.get('id');
    (await this.machinesService.getAMachine(this.id)).subscribe( async res => {
      this.machine = res.body;
      if(this.machine.status === 'CYCLE OFF'){
        this.bgColor = 'red';
        this.wrapperBg = 'rgba(255, 0, 0, 0.329)';
        this.statusAlarm = 'alarm-start';
      }
      else if(this.machine.status === 'OTHERS'){
        this.bgColor= 'yellow';
        this.wrapperBg = 'rgba(255, 255, 0, 0.322)';
        this.statusAlarm = 'alarm-start';
      }
      else if(this.machine.status === 'CYCLE ON'){
        this.bgColor= 'rgb(9, 207, 9)';
        this.wrapperBg = 'rgb(9, 207, 9, 0.330)';
      }
      else if(this.machine.status === 'SETUP'){
        this.bgColor= 'rgb(52, 123, 255)';
        this.wrapperBg = 'rgb(52, 123, 255, 0.330)';
      }
    });
  }
}
