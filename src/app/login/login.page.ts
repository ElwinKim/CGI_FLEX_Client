import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './account.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  checked: boolean;
  username: string;
  password: string;
  userJson: any;
  constructor(private accountService: AccountService, public toastController: ToastController) { }

  ngOnInit() {
    this.createLoginForm();
    if(localStorage.getItem('rememberCurrentUser') === 'true')
    {
      this.checked = true;
      this.userJson = JSON.parse(localStorage.getItem('currentUser'));
      this.username = this.userJson.userName;
      this.password = this.userJson.password;
    }
    else
    {
      localStorage.removeItem('rememberCurrentUser');
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
    }
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });

    // this.authenticationService.login(this.loginForm.userName.value, this.f.password.value,this.f.rememberMe.value)
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value.userName,
      this.loginForm.value.password, this.loginForm.value.rememberMe).subscribe( async () => {
        const toast = await this.toastController.create({
          message: 'Logged in Successfully',
          duration: 1000,
          color: 'secondary'
        });

        toast.present();
      }, async (error) => {
        const toast = await this.toastController.create({
          message: 'Cannot find your username or password',
          duration: 2000,
          color: 'danger'
        });

        toast.present();
      });
  }

}
