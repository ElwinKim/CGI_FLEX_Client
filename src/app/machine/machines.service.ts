import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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

    return this.http.get<IMachine>(this.baseUrl + 'api/Mobile/Machines', {headers, observe: 'response'})
    .pipe(
      // eslint-disable-next-line arrow-body-style
      map(response => {
        return response.body;
      })
    );
  }

  async getAMachine(machineId?: string){
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return await this.http.get<IMachine>(this.baseUrl + `api/Mobile/Machine/${machineId}`, {headers, observe:'response'});
  }

  async getTimeFormat(machine: IMachine){

    let cycleTime = machine.cycleTime;

    const h = Math.floor(cycleTime / 3600);
    const m = Math.floor(cycleTime % 3600 / 60);
    const s = Math.floor(cycleTime % 3600 % 60);


    const hDisplay = h > 0 ? h + (h === 1 ? ':' : ':') : '0';
    const mDisplay = m > 0 ? m + (m === 1 ? ':' : ':') : '0';
    const sDisplay = s > 0 ? s + (s === 1 ? '' : '') : '0';

    cycleTime++;
    return hDisplay+mDisplay+sDisplay;
  }
}
