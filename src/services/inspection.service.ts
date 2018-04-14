import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { NgForm } from '@angular/forms';

import { DriverService } from '../services/driver.service';

declare var cordova: any;

@Injectable()
export class InspectionService {
  imageUrl = '';

  constructor(private http: HttpClient, private storage: Storage,
              private file: File, private driverService: DriverService,
              private fileTransfer: FileTransfer) {
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

  uploadPhoto(imageUrl: string, token: string) {
    this.imageUrl = imageUrl;
    console.log('image url: ' + imageUrl);
    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: '',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
                                      .append('Authorization', token)
    }
    const transfer = this.fileTransfer.create();
    return transfer.upload(this.imageUrl, 'http://ua/TEST-drively-api/sites/_admin/api/v1/uploadInspectionImage', options);
  }

}
