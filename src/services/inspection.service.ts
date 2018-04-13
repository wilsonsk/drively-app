import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { DriverService } from '../services/driver.service';

declare var cordova: any;

@Injectable()
export class InspectionService {
  imageUrl = '';

  constructor(private http: HttpClient, private storage: Storage,
              private file: File, private driverService: DriverService) {
  }

}
