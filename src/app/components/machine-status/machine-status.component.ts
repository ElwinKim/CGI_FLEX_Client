import { Component, Input, OnInit } from '@angular/core';
import { IMachine } from 'src/shared/models/Machine';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss'],
})
export class MachineStatusComponent implements OnInit {
  @Input() machine: IMachine;

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

  constructor() { }

  ngOnInit() {
    this.statusCheck();
    this.getMachineInfo();
  }

  getMachineInfo(){
    this.cycleOff = '7';
    this.totalTime = '1:00:00';
    this.machineLabel = 'MC-07';
    this.partNumber = 'ABC123';
    this.machineName = 'MATSURA VX100';
  }

  calculationTime(){
  }

  //rgba(255, 0, 0, 0.329);
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
