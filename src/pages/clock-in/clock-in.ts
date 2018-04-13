import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { File, Entry, FileError } from '@ionic-native/file';

import { CompanyLoginPage } from '../company-login/company-login';

import { AuthService } from'../../services/auth.service';
import { DriverService } from '../../services/driver.service';

import { VehicleInspectionPage } from '../vehicle-inspection/vehicle-inspection';

@Component({
  selector: 'page-clock-in',
  templateUrl: 'clock-in.html',
})
export class ClockInPage {
  token: string;
  driver: string;
  company: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
              private driverService: DriverService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    const driver = this.navParams.get('driver');
    this.initDriver(driver);
    this.onLoadToken();
  }

  initDriver(driver: any) {
    this.driver = driver[0].username;
    this.company = this.authService.auth.company;
    this.driverService.initDriver(this.driver, this.authService.auth.company);
  }

  onLoadToken() {
    this.authService.fetchTokenFromDeviceStorage()
      .then((token) => {
        this.token = token;
      });
  }

  onClockIn() {
    const loading = this.loadingCtrl.create({
      content: 'Clocking in...'
    });
    loading.present();

    this.driverService.clockIn(this.token)
    .subscribe((data) => {
      loading.dismiss();
      console.log('checkCompanyCode: ' + data);

      if(data) {
        this.driverService.isClockedIn = true;
        this.navCtrl.setRoot(VehicleInspectionPage);
      } else {
        const a = this.alertCtrl.create({
          title: 'Clock in failed',
          buttons: ['OK']
        });
        a.present();
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.navCtrl.setRoot(CompanyLoginPage);
  }

}
