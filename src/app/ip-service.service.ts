import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ServerIP} from '../app/shared/models/serverIP.model';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http: HttpClient, public serverIp: ServerIP) { }

  public checkServerIP(serverIP: ServerIP)
  {
    console.log(serverIP.ipAddress);
    return this.http.get('http://' +serverIP.ipAddress, {observe: 'response'});
  }
}
