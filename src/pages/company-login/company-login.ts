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
  token: string;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private authService: AuthService,
              private alertCtrl: AlertController) {
                this.onLoadToken();
  }

  onLoadToken() {
    this.authService.fetchTokenFromDeviceStorage()
      .then((token) => {
          this.authService.isTokenExpired(token)
            .subscribe((expired) => {
              if(expired) {
                const a = this.alertCtrl.create({
                  title: 'Company Authentication Token is Expired',
                  buttons: ['OK']
                });
                a.present();
              } else {
                this.token = token;
                this.getCompanyFromToken();
              }
            });
      });
  }

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Checking your company code...'
    });
    loading.present();

    this.authService.checkCompanyCode(form.value.company, form.value.companyCode)
      .subscribe((data) => {
        console.log('checkCompanyCode: ' + data);
        if(data) {
          loading.dismiss();
          this.authService.setAuth(form.value.company, form.value.companyCode);
          this.authService.saveTokenToDeviceStorage(data);
          this.navCtrl.setRoot(DriverLoginPage);
        } else {
          loading.dismiss();
          const a = this.alertCtrl.create({
            title: 'Company Code failed or is expired',
            buttons: ['OK']
          });
          a.present();
        }
      });
  }

  getCompanyFromToken() {
    this.authService.fetchCompanyFromToken(this.token)
      .subscribe((company) => {
        if(company) {
          this.authService.setAuth(company.name, company.code);
          this.navCtrl.setRoot(DriverLoginPage);
        } else {
          console.log('failed to fetch company data from token');
        }
      });
  }

}
