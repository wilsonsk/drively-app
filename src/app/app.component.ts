import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CompanyLoginPage } from '../pages/company-login/company-login';
import { DriverLoginPage } from '../pages/driver-login/driver-login';

import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  driverLoginPage = DriverLoginPage;
  companyLoginPage = CompanyLoginPage;

  rootPage: any = CompanyLoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authService: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Company Login', component: CompanyLoginPage },
      { title: 'Driver Login', component: DriverLoginPage }
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }

  openPage(page) {
    this.nav.setRoot(page);
  }

  onLogout() {
    this.authService.logout();
    this.nav.setRoot(CompanyLoginPage);
  }
}
