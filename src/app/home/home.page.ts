import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IpServiceService } from '../ip-service.service';
import { AccountService } from '../login/account.service';
import { ServerIP } from '../shared/models/serverIP.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  ipAddress: string;
  storage: any;
  constructor(private ip: IpServiceService, public alertController: AlertController,
    public serverIP: ServerIP, private router: Router, private accountService: AccountService) {}

    ngOnInit(){
      this.serverIP.ipAddress = localStorage.getItem('IpAddress');
      this.checkServer();
      this.loadCurrentUser();
      console.log('check');
    }

    ngOnload(){
      this.serverIP.ipAddress = localStorage.getItem('IpAddress');
      this.checkServer();
      this.loadCurrentUser();
      console.log('check');
    }
    loadCurrentUser(){
      const token = localStorage.getItem('token') || sessionStorage.getItem('token') ;
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
