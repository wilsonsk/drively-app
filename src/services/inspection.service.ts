import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { NgForm } from '@angular/forms';

import { DriverService } from '../services/driver.service';

declare var cordova: any;

@Injectable()
export class InspectionService {
  imageUrl = '';

  constructor(private http: HttpClient, private storage: Storage,
              private file: File, private driverService: DriverService) {
  }

  submitInspection(form: NgForm, token: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .append('Authorization', token);
    const options = {
      headers: headers
    };
    return this.http.post('http://ua/TEST-drively-api/sites/_admin/api/v1/submitInspection', {
      field1: form.value.field1,
      field2: form.value.field2
    }, options);
  }

}
