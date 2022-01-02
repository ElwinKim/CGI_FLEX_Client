import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/login/account.service';

@Component({
  selector: 'app-pop-component',
  templateUrl: './pop-component.component.html',
  styleUrls: ['./pop-component.component.scss'],
})
export class PopComponentComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {}

  logout(){
    this.accountService.logout();
  }

}
