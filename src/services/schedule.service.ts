import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Trip } from '../models/trip.interface';

@Injectable()
export class ScheduleService {
  private trips: Trip[] = [];
  username: string;
  company: string;
  token: string;

  constructor(private http: HttpClient) {}

  getTrips(username:string, company: string, token: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .append('Authorization', token);
    const options = {
      headers: headers
    };
    return this.http.get('http://ua/TEST-drively-api/sites/_admin/api/v1/getDriverSchedule' + '/' + username + '/' + company, options);
  }
}
