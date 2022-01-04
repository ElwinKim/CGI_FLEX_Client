import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserProfile } from 'src/shared/models/UserProfile';
import { AccountService } from '../login/account.service';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  id: string;
  userProfile: IUserProfile;
  userName: string;
  email: string;
  userId: number;
  role: string;
  disableUserName = true;
  disableEmail= true;
  disableUserId = true;
  disableRole = true;
  ipAdress: string;
  constructor(private accountService: AccountService, private userService: UserServiceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserProfile();

  }

  async getUserProfile(){
    this.id = this.route.snapshot.paramMap.get('id');
    (await this.userService.getUserProfile()).subscribe(res=>{
      this.userProfile = res.body;
      this.userName = this.userProfile.userName;
      this.email = this.userProfile.email;
      this.userId = this.userProfile.userID;
      this.role = this.userProfile.role;
      this.ipAdress = localStorage.getItem('IpAddress');
    });
  }

  logout(){
    this.accountService.logout();
  }
}
