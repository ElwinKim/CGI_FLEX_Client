import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMachine } from 'src/shared/models/Machine';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss'],
})

export class MachineListComponent implements OnInit {
  @Input() machine: IMachine;

  totalGageLength = 12;
  otherHidden = false;
  cycleOnHidden = false;
  cycleOffHidden = false;
  setupHidden = false;
  statusAlarm: string;
  bgColor: string;
  wrapperBg: string;
  cycleOff: string;
  setup: string;
  cycleOn: string;
  other: string;
  totalTime: string;
  machineLabel: string;
  partNumber: string;
  machineName: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.statusCheck();
    this.calculationTime();
  }

  /*
  * Calculate time for display total time bar chart
  */
  calculationTime(){
    //Calculate total cycle time
    const cycleTime = this.machine.cycleTime;

    const h = Math.floor(cycleTime / 3600);
    const m = Math.floor(cycleTime % 3600 / 60);
    const s = Math.floor(cycleTime % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? ':' : ':') : '00';
    const mDisplay = m > 0 ? m + (m === 1 ? ':' : ':') : '00';
    const sDisplay = s > 0 ? s + (s === 1 ? '' : '') : '00';

    this.totalTime = hDisplay + mDisplay + sDisplay;

    //Converts second to hour
    const cycleOffTime = this.machine.cycleOffTime/3600;
    const cycleOnTime = this.machine.cycleOnTime/3600;
    const setUpTime = this.machine.setupTime/3600;
    const othersTime = this.machine.othersTime/3600;

    const result =cycleOffTime + cycleOnTime +
    setUpTime + othersTime;

    let cycleOffCal = Math.round(((cycleOffTime/result) * this.totalGageLength));
    let cycleOnCal = Math.round(((cycleOnTime/result) * this.totalGageLength));
    let setupCal = Math.round(((setUpTime/result) * this.totalGageLength));
    let otherCal = Math.round(((othersTime/result) * this.totalGageLength));

    if(cycleOffCal <= 0)
    {
      this.cycleOffHidden = true;
    }
    if(cycleOnCal <= 0)
    {

      this.cycleOnHidden = true;
    }
    if(setupCal <= 0)
    {

      this.setupHidden = true;
    }
    if(otherCal <= 0)
    {
      this.otherHidden = true;
    }

    if(Math.round((cycleOffCal + cycleOnCal + setupCal + otherCal)) > 12){
      this.totalGageLength -= 0.5;
    }

    cycleOffCal = Math.round(((cycleOffTime/result) * this.totalGageLength));
    cycleOnCal = Math.round(((cycleOnTime/result) * this.totalGageLength));
    setupCal = Math.round(((setUpTime/result) * this.totalGageLength));
    otherCal = Math.round(((othersTime/result) * this.totalGageLength));

    if(Math.round((cycleOffCal + cycleOnCal + setupCal + otherCal)) < 12){
      if(cycleOffCal !== 0)
      {
        cycleOffCal +=1;
      }
      else if(cycleOnCal !== 0)
      {
        cycleOnCal +=1;
      }
      else if(setupCal !== 0)
      {
        setupCal +=1;
      }
      else if(otherCal !== 0)
      {
        setupCal +=1;
      }
    }

    this.cycleOff = Math.round(cycleOffCal).toString();
    this.cycleOn = Math.round(cycleOnCal).toString();
    this.setup = Math.round(setupCal).toString();
    this.other = Math.round(otherCal).toString();

  }

  /*
  * Navigate to Machine status page
  */
  navigateRouter(){
    this.router.navigate(['/machine-status', this.machine.machineId]);
  }

  /*
  * Checks the machine status.
  * Set the back-ground color and the alarm.
  * the Alarm goes only on CYCLE OFF and OTHERS.
  */
  statusCheck(){
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
  }
}
