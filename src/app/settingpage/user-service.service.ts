import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserProfile } from 'src/shared/models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  async getUserProfile(){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return await this.http.get<IUserProfile>(this.baseUrl + `api/User/UserProfile`, {headers, observe:'response'});
  }
}
