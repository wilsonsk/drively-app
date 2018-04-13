import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

// Pages
import { MyApp } from './app.component';
import { CompanyLoginPage } from '../pages/company-login/company-login';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { ClockInPage } from '../pages/clock-in/clock-in';
import { VehicleInspectionPage } from '../pages/vehicle-inspection/vehicle-inspection';

// Services
import { AuthService } from '../services/auth.service';
import { DriverService } from '../services/driver.service';
import { InspectionService } from '../services/inspection.service';

// Interceptor
import { AuthInterceptor } from '../interceptors/auth.interceptor';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CompanyLoginPage,
    DriverLoginPage,
    ClockInPage,
    VehicleInspectionPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CompanyLoginPage,
    DriverLoginPage,
    ClockInPage,
    VehicleInspectionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    DriverService,
    InspectionService,
    File,
    Camera,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
