import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';

import { Auth } from '../models/auth.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  test_checkCompanyCode(company: string, code: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Promise complete');
        resolve();
      }, 500);
    });
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };
  checkCompanyCode(company: string, code: string) {
    return this.http.get('http://ua/TEST-drively-api/sites/_admin/api/v1/testApi' + '/' + company + '/' + code);

  }

}
