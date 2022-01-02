import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { IpServiceService } from './ip-service.service';
import {ServerIP} from '../app/shared/models/serverIP.model';
import { Router, RouterModule, Routes } from '@angular/router';
import { AccountService } from './login/account.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{

  constructor() {
  }

  ngOnInit(){
  }


}
