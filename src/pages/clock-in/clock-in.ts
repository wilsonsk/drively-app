import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from'../../services/auth.service';
import { DriverService } from '../../services/driver.service';

@IonicPage()
@Component({
  selector: 'page-clock-in',
  templateUrl: 'clock-in.html',
})
export class ClockInPage {
  token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private driverService: DriverService) {
    const driver = this.navParams.get('driver');
    this.driverService.initDriver(driver[0].username, driver[0].company_fk);
    this.onLoadToken();
  }

  onLoadToken() {
    this.authService.fetchTokenFromDeviceStorage()
      .then((token) => {
        this.token = token;
      });
  }

  onClockIn() {
    this.driverService.clockIn(this.token)
    .subscribe((data) => {
      console.log('checkCompanyCode: ' + data);
      if(data) {
        console.log('clock in success');
      } else {
        loading.dismiss();
        const a = this.alertCtrl.create({
          title: 'Clock in failed',
          buttons: ['OK']
        });
        a.present();
      }
    });
  }

}
