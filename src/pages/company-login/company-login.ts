import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import { DriverLoginPage } from '../driver-login/driver-login';

@Component({
  selector: 'page-company-login',
  templateUrl: 'company-login.html'
})
export class CompanyLoginPage {
  hasToken = false;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private authService: AuthService,
              private alertCtrl: AlertController) {
  }

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Checking your company code...'
    });
    loading.present();

    this.authService.checkCompanyCode(form.value.company, form.value.companyCode)
      .subscribe((data) => {
        console.log(data);
        if(data) {
          loading.dismiss();
          this.authService.auth.isAuthenticated = true;
          this.authService.setAuth(form.value.company, form.value.companyCode);
          this.authService.saveTokenToDeviceStorage(data);
          this.navCtrl.setRoot(DriverLoginPage);
        } else {
          loading.dismiss();
          const a = this.alertCtrl.create({
            title: 'Company Code failed',
            buttons: ['OK']
          });
          a.present();
        }
      });
  }

}
