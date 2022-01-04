import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { PopComponentComponent } from 'src/app/components/pop-component/pop-component.component';
import { IMachine } from 'src/shared/models/Machine';
import { MachinesService } from '../machines.service';
import { StatusListComponent } from './components/status-list/status-list.component';

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
  totalTime: string;
  startTime: string;
  hours: string;
  cycleTime: number;
  cycleOn: string;
  cycleOff: string;
  setUp: string;
  others: string;
  setUpPercent: string;
  cycleOnPercent: string;
  cycleOffPercent: string;
  othersPercent: string;
  setupBar: string;
  cycleOnBar: string;
  cycleOffBar: string;
  othersBar: string;
  fovrBackground: string;
  sovrBackground: string;
  rovrBackground: string;
  fovrValue: number;
  sovrValue: number;
  rovrValue: number;

  constructor(public popoverContorller: PopoverController, private machinesService: MachinesService,
    private route: ActivatedRoute, private menu: MenuController) { }

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
      this.statusCheck();
      this.cycleTime = this.machine.cycleTime;
      this.getStatusHours();
      this.getPercentage();
      this.displayOverride();
      setInterval(()=>{
        this.getCycleTime();
      }, 1000);
    }, error=>{
      console.log(error);
    });
    return true;
  }

  statusCheck(){
    if(this.machine?.status === 'CYCLE OFF'){
      this.bgColor = 'red';
      this.wrapperBg = 'rgba(255, 0, 0, 0.329)';
      this.statusAlarm = 'alarm-start';
    }
    else if(this.machine?.status === 'OTHERS'){
      this.bgColor= 'yellow';
      this.wrapperBg = 'rgba(255, 255, 0, 0.322)';
      this.statusAlarm = 'alarm-start';
    }
    else if(this.machine?.status === 'CYCLE ON'){
      this.bgColor= 'rgb(9, 207, 9)';
      this.wrapperBg = 'rgb(9, 207, 9, 0.330)';
    }
    else if(this.machine?.status === 'SETUP'){
      this.bgColor= 'rgb(52, 123, 255)';
      this.wrapperBg = 'rgb(52, 123, 255, 0.330)';
    }
  }

  //If there is really database, Cycletime will be updated
  getCycleTime(){
    const h = Math.floor(this.cycleTime / 3600);
    const m = Math.floor(this.cycleTime % 3600 / 60);
    const s = Math.floor(this.cycleTime % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? ':' : ':') : '0';
    const mDisplay = m > 0 ? m + (m === 1 ? ':' : ':') : '0';
    const sDisplay = s > 0 ? s + (s === 1 ? '' : '') : '0';

    this.totalTime = hDisplay+mDisplay+sDisplay;
    this.cycleTime++;
  }

  //get status's cycle hours and calculate tiem for progress bar
  getStatusHours(){
    const cycleOffCal = Math.round(this.machine.cycleOffTime/ 3600);
    const cycleOnCal = Math.round(this.machine.cycleOnTime/ 3600);
    const setUpCal = Math.round(this.machine.setupTime/ 3600);
    const othersCal = Math.round(this.machine.othersTime/ 3600);

    this.cycleOff = '00:'+cycleOffCal.toString() + ' Hours';
    this.cycleOn = '00:'+cycleOnCal.toString() + ' Hours';
    this.setUp = '00:'+setUpCal.toString() + ' Hours';
    this.others = '00:'+othersCal.toString() + ' Hours';

    this.setupBar = (45+(setUpCal/2)).toString()+'deg';
    this.cycleOnBar = (135+(cycleOnCal/2)).toString()+'deg';
    this.othersBar = (-44+(othersCal/2)).toString()+'deg';
    this.cycleOffBar = (-135+(cycleOffCal/2)).toString()+'deg';

  }

  getPercentage(){
    this.cycleOffPercent = ((this.machine.cycleOffTime/this.machine.cycleTime)*100).toFixed(0) + '%';
    this.cycleOnPercent = ((this.machine.cycleOnTime/this.machine.cycleTime)*100).toFixed(0) + '%';
    this.setUpPercent = ((this.machine.setupTime/this.machine.cycleTime)*100).toFixed(0) + '%';
    this.othersPercent = ((this.machine.othersTime/this.machine.cycleTime)*100).toFixed(0) + '%';
  }

  displayOverride(){
    this.fovrValue = this.machine.feedrateOvr;
    this.sovrValue = this.machine.spindleOvr;
    this.rovrValue = this.machine.rapidOvr;

    this.changeRangeColor(this.fovrValue, this.sovrValue, this.rovrValue);
  }

  fovrValueChanged(e: any) {
    this.fovrValue = e.target.value;
    if(this.fovrValue >= 0 && this.fovrValue <= 100-this.fovrValue)
    {
      this.fovrBackground = 'red';
    }
    else if(this.fovrValue >= 100-this.fovrValue && this.fovrValue <= 99)
    {
      this.fovrBackground = 'yellow';
    }
    else if(this.fovrValue === 100)
    {
      this.fovrBackground = 'green';
    }
    else if(this.fovrValue >= 101 && this.fovrValue <= 100+this.fovrValue)
    {
      this.fovrBackground = 'yellow';
    }
    else if(this.fovrValue >= 100 + this.fovrValue && this.fovrValue <= 200)
    {
      this.fovrBackground = 'Red';
    }
  }
  rovrValueChanged(e: any) {
    this.rovrValue = e.target.value;
    console.log(this.rovrValue);
    if(this.rovrValue >= 0 && this.rovrValue <= 100-this.rovrValue)
    {
      this.rovrBackground = 'red';
    }
    else if(this.rovrValue >= 100-this.rovrValue && this.rovrValue <= 99)
    {
      this.rovrBackground = 'yellow';
    }
    else if(this.rovrValue === 100)
    {
      this.rovrBackground = 'green';
    }
    else if(this.rovrValue >= 101 && this.rovrValue <= 100+this.rovrValue)
    {
      this.rovrBackground = 'yellow';
    }
    else if(this.rovrValue >= 100 + this.rovrValue && this.rovrValue <= 200)
    {
      this.rovrBackground = 'Red';
    }
  }

  sovrValueChanged(e: any) {
    this.sovrValue = e.target.value;
    if(this.sovrValue >= 0 && this.sovrValue <= 100-this.sovrValue)
    {
      this.sovrBackground = 'red';
    }
    else if(this.sovrValue >= 100-this.sovrValue && this.sovrValue <= 99)
    {
      this.sovrBackground = 'yellow';
    }
    else if(this.sovrValue === 100)
    {
      this.sovrBackground = 'green';
    }
    else if(this.sovrValue >= 101 && this.sovrValue <= 100+this.sovrValue)
    {
      this.sovrBackground = 'yellow';
    }
    else if(this.sovrValue >= 100 + this.sovrValue && this.sovrValue <= 200)
    {
      this.sovrBackground = 'Red';
    }
  }

  changeRangeColor(fovrValue?: number, sovrValue?: number, rovrValue?: number){
    if(fovrValue !== null){
      if(fovrValue >= 0 && fovrValue <= 100-fovrValue)
      {
        this.fovrBackground = 'red';
      }
      else if(fovrValue >= 100-fovrValue && fovrValue <= 99)
      {
        this.fovrBackground = 'yellow';
      }
      else if(fovrValue === 100)
      {
        this.fovrBackground = 'green';
      }
      else if(fovrValue >= 101 && fovrValue + 100)
      {
        this.fovrBackground = 'yellow';
      }
      else if(fovrValue >= 100 + fovrValue && fovrValue <= 200)
      {
        this.fovrBackground = 'Red';
      }
    }

    if(sovrValue !== null){
      if(sovrValue >= 0 && sovrValue <= 100-sovrValue)
      {
        this.sovrBackground = 'red';
      }
      else if(sovrValue >= 100-sovrValue && sovrValue <= 99)
      {
        this.sovrBackground = 'yellow';
      }
      else if(sovrValue === 100)
      {
        this.sovrBackground = 'green';
      }
      else if(sovrValue >= 101 && sovrValue <= sovrValue + 100)
      {
        this.sovrBackground = 'yellow';
      }
      else if(sovrValue >= 100 + sovrValue && sovrValue <= 200)
      {
        this.sovrBackground = 'Red';
      }
    }

    if(rovrValue !== null)
    {
      if(rovrValue >= 0 && rovrValue <= 100-rovrValue)
      {
        this.rovrBackground = 'red';
      }
      else if(rovrValue >= 100-rovrValue && rovrValue <= 99)
      {
        this.rovrBackground = 'yellow';
      }
      else if(rovrValue === 100)
      {
        this.rovrBackground = 'green';
      }
      else if(rovrValue >= 101 && rovrValue <= rovrValue + 100)
      {
        this.rovrBackground = 'yellow';
      }
      else if(rovrValue >= 100 + rovrValue && rovrValue <= 200)
      {
        this.rovrBackground = 'Red';
      }
    }
  }

  openMenu(){
    console.log('menu');
    this.menu.open();
  }
}


