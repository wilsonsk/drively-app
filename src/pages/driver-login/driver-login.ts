import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-driver-login',
  templateUrl: 'driver-login.html'
})
export class DriverLoginPage {
  token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.onLoadToken();
  }

  onLoadToken() {
    this.authService.fetchTokenFromDeviceStorage()
      .then((token) => {
        this.token = token;
      });
  }

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Checking your company code...'
    });
    loading.present();

    this.authService.driverLogin(form.value.driver, form.value.password, this.token)
      .subscribe((data) => {
        if(data) {
          console.log('driver login: ' + JSON.stringify(data));
          loading.dismiss();
        } else {
          loading.dismiss();
          const a = this.alertCtrl.create({
            title: 'Driver Login failed',
            buttons: ['OK']
          });
          a.present();
        }
      });
  }

}