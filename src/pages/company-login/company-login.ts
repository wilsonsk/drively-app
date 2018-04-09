import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-company-login',
  templateUrl: 'company-login.html'
})
export class CompanyLoginPage {

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private authService: AuthService) {

  }

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Checking your company code...'
    });
    // loading.present();

    // this.authService.test_checkCompanyCode(form.value.company, form.value.companyCode)
    //   .then(() => {
    //     loading.dismiss()
    //   })
    //   .catch((error) => {
    //     loading.dismiss();
    //   });


    this.authService.checkCompanyCode(form.value.company, form.value.companyCode)
      .subscribe((data) => {
        console.log(data);
      });
  }

}
