import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/shared/models/User';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { IUserProfile } from 'src/shared/models/UserProfile';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentUser: Observable<IUser>;
  baseUrl = environment.apiUrl;
  isLoggedIn = false;
  httpOptions = null;
  rememberMe = false;
  userJson: any;

  private currentUserSubject: BehaviorSubject<IUser>;

  constructor(private http: HttpClient, private router: Router) {
    this.rememberMe = localStorage.getItem('rememberCurrentUser') === 'true' ? true : false;


      this.currentUserSubject = new BehaviorSubject<IUser>(
        JSON.parse(localStorage.getItem('currentUser'))
      );
      this.currentUser = this.currentUserSubject.asObservable();
   }

   loadCurrentUser(token: string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'api/User/UserProfile', {headers}).pipe(
      map((userProfile: IUserProfile) => {
        if(userProfile)
        {
          localStorage.setItem('token', token);
          this.router.navigate(['/machinelist']);
        }
      })
    );

  }

  login(username: string, password: string, isRemeberMe: boolean){

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post(this.baseUrl + 'api/user/Auth', {UserName: username, Password: password}).pipe(
      map((user: IUser) => {
        if (user && user.token) {
          if(isRemeberMe){
            this.resetcredentials();
            user.password = password;
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('rememberCurrentUser', 'true');
          } else {
            localStorage.setItem('rememberCurrentUser', 'false');
          }
          localStorage.setItem('token', user.token);
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          this.currentUserSubject.next(user);
          this.router.navigate(['/machinelist']);
        } else {
          return false;
        }
      })
    );
  }

  checkLoggedIn(){
    if(localStorage.getItem('token') || sessionStorage.getItem('token'))
    {
      return true;
    }
    else
    {
      this.router.navigate(['/']);
    }
  }

  resetcredentials() {
    //clear all localstorages
    localStorage.removeItem('rememberCurrentUser');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  logout(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setTimeout(() => this.router.navigate(['/home']));
  }
}
