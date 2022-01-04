import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/login/account.service';

@Component({
  selector: 'app-pop-component',
  templateUrl: './pop-component.component.html',
  styleUrls: ['./pop-component.component.scss'],
})
export class PopComponentComponent implements OnInit {

  constructor(private accountService: AccountService, private route: Router) { }

  ngOnInit() {}

  logout(){
    this.accountService.logout();
  }

  goToSetting(){
    const jwt = localStorage.getItem('token');
    const jwtData = jwt.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);

    const id = decodedJwtData.nameid;

    this.route.navigate([`/settings/${id}`]);
  }
}
