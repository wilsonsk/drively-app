import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ScheduleService } from '../../../services/schedule.service';
import { AuthService } from'../../../services/auth.service';
import { DriverService } from '../../../services/driver.service';

import { Trip } from '../../../models/trip.interface';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage implements OnInit {
  trips: Trip[] = [];
  token: string;

  constructor(private scheduleService: ScheduleService, private authService: AuthService,
              private driverService: DriverService, private alertCtrl: AlertController) {
  }


  onLoadToken() {
    return this.authService.fetchTokenFromDeviceStorage();
  }

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
    this.onLoadToken()
      .then((token) => {
        this.token = token;
        this.scheduleService.getTrips(this.driverService.username, this.driverService.company, this.token)
          .subscribe((trips: Trip[]) => {
            if(trips) {
              console.log(trips);
              this.trips = trips != null ? trips : [];
            } else {
              const a = this.alertCtrl.create({
                title: 'Could not obtain trips',
                buttons: ['OK']
              });
              a.present();
            }
          });
      })
      .catch(() => {

      });

  }

}
