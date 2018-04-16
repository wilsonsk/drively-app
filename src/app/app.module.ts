import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

// Pages
import { MyApp } from './app.component';
import { CompanyLoginPage } from '../pages/company-login/company-login';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { ClockInPage } from '../pages/clock-in/clock-in';
import { VehicleInspectionPage } from '../pages/vehicle-inspection/vehicle-inspection';

import { TripsPage } from '../pages/schedule/trips/trips';
import { TripNotesPage } from '../pages/schedule/trip-notes/trip-notes';
import { TripPage } from '../pages/schedule/trip/trip';
import { MapPage } from '../pages/schedule/map/map';

// Components
import { HeaderMenuComponent } from '../components/header-menu/header-menu.component';
import { CardDrivelyLogo } from '../components/card-drively-logo/card-drively-logo.component';

// Services
import { AuthService } from '../services/auth.service';
import { DriverService } from '../services/driver.service';
import { InspectionService } from '../services/inspection.service';
import { ScheduleService } from '../services/schedule.service';

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
    VehicleInspectionPage,
    TripsPage,
    TripNotesPage,
    TripPage,
    MapPage,
    HeaderMenuComponent,
    CardDrivelyLogo,
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
    VehicleInspectionPage,
    TripsPage,
    TripNotesPage,
    TripPage,
    MapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    DriverService,
    InspectionService,
    File,
    Camera,
    FileTransfer,
    ScheduleService,
    NativePageTransitions,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
