import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss'],
})
export class MachineStatusComponent implements OnInit {

  statusAlarm: string;

  constructor() { }

  ngOnInit() {
    this.statusAlarm = '';
  }

}
