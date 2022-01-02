import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IMachine } from 'src/shared/models/Machine';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getMachinesInfo(){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IMachine>(this.baseUrl + 'api/Mobile/Machines', {headers});
  }

}
