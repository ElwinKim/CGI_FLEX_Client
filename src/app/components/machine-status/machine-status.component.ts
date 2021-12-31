import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMachine } from 'src/shared/models/Machine';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss'],
})
export class MachineStatusComponent implements OnInit {
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
    this.totalTime = '1:00:00';

    const cycleOffTime = this.machine.CycleOff/3600;
    const cycleOnTime = this.machine.CycleOn/3600;
    const setUpTime = this.machine.SetUp/3600;
    const othersTime = this.machine.Others/3600;


    const result =cycleOffTime + cycleOnTime +
    setUpTime + othersTime;

    const cycleOffCal = Math.round(((cycleOffTime/result) * this.totalGageLength));
    const cycleOnCal = Math.round(((cycleOnTime/result) * this.totalGageLength));
    const setupCal = Math.round(((setUpTime/result) * this.totalGageLength));
    const otherCal = Math.round(((othersTime/result) * this.totalGageLength));

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

    this.cycleOff = Math.round(((cycleOffTime/result) * this.totalGageLength)).toString();
    this.cycleOn = Math.round(((cycleOnTime/result) * this.totalGageLength)).toString();
    this.setup = Math.round(((setUpTime/result) * this.totalGageLength)).toString();
    this.other = Math.round(((othersTime/result) * this.totalGageLength)).toString();

  }

  /*
  * Navigate to Machine status page
  */
  navigateRouter(){
    this.router.navigate(['/machinelist', this.machine.MachineId]);
  }

  /*
  * Checks the machine status.
  * Set the back-ground color and the alarm.
  * the Alarm goes only on CYCLE OFF and OTHERS.
  */
  statusCheck(){
    if(this.machine.Status === 'CYCLE OFF'){
      this.bgColor = 'red';
      this.wrapperBg = 'rgba(255, 0, 0, 0.329)';
      this.statusAlarm = 'alarm-start';
    }
    else if(this.machine.Status === 'OTHERS'){
      this.bgColor= 'yellow';
      this.wrapperBg = 'rgba(255, 255, 0, 0.322)';
      this.statusAlarm = 'alarm-start';
    }
    else if(this.machine.Status === 'CYCLE ON'){
      this.bgColor= 'rgb(9, 207, 9)';
      this.wrapperBg = 'rgb(9, 207, 9, 0.330)';
    }
    else if(this.machine.Status === 'SETUP'){
      this.bgColor= 'rgb(52, 123, 255)';
      this.wrapperBg = 'rgb(52, 123, 255, 0.330)';
    }
  }


}
