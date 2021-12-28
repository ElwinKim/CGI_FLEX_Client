import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { IpServiceService } from './ip-service.service';
import {ServerIP} from '../app/shared/models/serverIP.model';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{
  ipAddress: string;
  storage: any;
  constructor(private ip: IpServiceService, public alertController: AlertController,
    public serverIP: ServerIP) {
  }

  ngOnInit(){
    this.serverIP.ipAddress = localStorage.getItem('IpAddress');
    this.checkServer();
  }

  async checkServer()
  {
    if(localStorage.getItem('IpAddress') === 'undefined')
    {
      console.log('ip');
      await this.generateAlert();
    }
    else
    {
      this.ip.checkServerIP(this.serverIP).subscribe( async (res: any) =>
      {
        console.log(res.status);
      },
      async error =>
      {
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
