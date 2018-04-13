import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

import { Driver } from '../models/driver.interface';


@Injectable()
export class DriverService {
  username: string;
  company: string;
  schedule: any;
  isClockedIn = false;
  isVehicleInspected = false;


  constructor(private http: HttpClient) {
  }

  initDriver(username: string, company: string) {
    this.username = username;
    this.company = company;
  }

  clockIn(token: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .append('Authorization', token);
    const options = {
      headers: headers
    };
    return this.http.post('http://ua/TEST-drively-api/sites/_admin/api/v1/driverClockIn' + '/' + this.username, {
      clockIn: 'some time value',
    }, options);
  }

}
