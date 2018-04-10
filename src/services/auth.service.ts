import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpOptions } from '@angular/common/http';
import 'rxjs/Rx';

import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

@Injectable()
export class AuthService {
  auth = {
    'company': '',
    'code': '',
    'isAuthenticated': false
  }


  constructor(private http: HttpClient, private storage: Storage, private file: File) {
  }

  setAuth(company: string, code: string) {
    this.auth.company = company;
    this.auth.code = code;
  }

  checkCompanyCode(company: string, code: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
      })
    };
    return this.http.get('http://ua/TEST-drively-api/sites/_admin/api/v1/checkCompanyCode' + '/' + company + '/' + code);
  }

  driverLogin(driver, password, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.get('http://ua/TEST-drively-api/sites/_admin/api/v1/driverLogin' + '/' + driver + '/' + password, {}, httpOptions);

  }

  saveTokenToDeviceStorage(token: string) {
    this.storage.set('drivelyToken', token)
      .then(() => {
        console.log('save successful');
      })
      .catch((error) => {
        console.log('save failed');
      });
  }

  fetchTokenFromDeviceStorage() {
    return this.storage.get('drivelyToken')
      .then((token) => {
        console.log('fetch successful');
        return token;
      })
      .catch((error) => {
        console.log('failed to fetch token');
      });
  }

}
