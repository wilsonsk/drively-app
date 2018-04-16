import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { ClockInPage } from '../clock-in/clock-in';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-driver-login',
  templateUrl: 'driver-login.html'
})
export class DriverLoginPage {
  token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions) {
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
      content: 'Checking your driver credentials...'
    });
    loading.present();

    this.authService.driverLogin(form.value.driver, form.value.password, this.token)
      .subscribe((data) => {
        if(data) {
          console.log('driver login response: ' + JSON.stringify(data));
          this.authService.auth.isAuthenticated = true;
          loading.dismiss();
          this.navCtrl.setRoot(ClockInPage, {driver:data});
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

  ionViewWillLeave() {
    const options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };
    this.nativePageTransitions.slide(options);
   }

}
