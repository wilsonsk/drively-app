import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  isTokenExpired(token: string) {
    return this.http.get('http://ua/TEST-drively-api/sites/_admin/api/v1/isTokenExpired' + '/' + token);
  }

  checkCompanyCode(company: string, code: string) {
    return this.http.get('http://ua/TEST-drively-api/sites/_admin/api/v1/checkCompanyCode' + '/' + company + '/' + code);
  }

  driverLogin(driver, password, token) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .append('Authorization', token);
    const options = {
      headers: headers
    };
    return this.http.get('http://ua/TEST-drively-api/sites/_admin/api/v1/driverLogin' + '/' + driver + '/' + password, options);
  }

  saveTokenToDeviceStorage(token: any) {
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
        return 0;
      });
  }

  logout() {
    this.auth.isAuthenticated = false;
  }


}
