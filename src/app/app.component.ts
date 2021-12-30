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
  ipAddress: string;
  storage: any;
  constructor(private ip: IpServiceService, public alertController: AlertController,
    public serverIP: ServerIP, private router: Router, private accountService: AccountService) {
  }

  ngOnInit(){
    this.serverIP.ipAddress = localStorage.getItem('IpAddress');
    this.checkServer();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(()=> {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
    }
  }

  async checkServer()
  {
    if(localStorage.getItem('IpAddress') === 'undefined')
    {
      await this.generateAlert();
    }
    else
    {
      this.ip.checkServerIP(this.serverIP).subscribe( (res: any) =>
      {
        console.log('Server is running');
        this.router.navigate(['/login']);
      },
        error =>
      {
        console.log(error.message);
        this.generateAlert(error);
      });
    }

  }

  async generateAlert(error?: any){
    const alert = await this.alertController.create
    ({
      cssClass: 'my-custom-class',
      header: 'Server Not Found: 404',
      inputs:[
        {
          name:'IPAddress',
          type:'text',
          placeholder: 'e.g. 127.0.0.1:8080',
        }
      ],
      message: 'Enter new Ip Address',
      buttons: [
        'cancel'
        ,
        {
          text: 'OK',
          handler: (data) => {
            localStorage.setItem('IpAddress',data.IPAddress);
            this.ngOnInit();
          }
        }]
    });
    await alert.present();


  }
}
