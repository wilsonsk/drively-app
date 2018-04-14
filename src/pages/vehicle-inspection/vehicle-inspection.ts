import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';

import { AuthService } from'../../services/auth.service';
import { DriverService } from '../../services/driver.service';
import { InspectionService } from '../../services/inspection.service';

declare var cordova: any;

@Component({
  selector: 'page-vehicle-inspection',
  templateUrl: 'vehicle-inspection.html',
})
export class VehicleInspectionPage {
  token: string;
  driver: string;
  company: string;
  imageUrl = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private inspectionService: InspectionService,
              private driverService: DriverService, private loadingCtrl: LoadingController,
              private camera: Camera, private toastCtrl: ToastController, private file: File) {
    this.initDriver();
    this.onLoadToken();
  }

  onLoadToken() {
    this.authService.fetchTokenFromDeviceStorage()
      .then((token) => {
        this.token = token;
      });
  }

  initDriver() {
    this.driver = this.driverService.username;
    this.company = this.driverService.company;
  }

  onOpenCamera() {
      this.camera.getPicture({
        correctOrientation: true,
      })
        .then((imageData) => {
          // imageData depends on save destination type
          console.log(imageData);
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          // cordova.file.dataDirectory == folder for this app on the specific platform/device where you can store files permanently
          // File.moveFile(sourcePath, sourceFileName, destinationPath, destinationFileName)
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then((data: Entry) => {
              this.imageUrl = data.nativeURL;
            })
            .catch((error: FileError) => {
              this.imageUrl = '';
              const toast = this.toastCtrl.create({
                message: 'Could not save image. Please try again',
                duration: 2500
              });
              toast.present();
              // Cleanup renames each file same name - must set new file name,'newFileName'
              this.camera.cleanup();
              // OR
              // File.removeFile(path, currentName);

            });
          this.imageUrl = imageData;
        })
        .catch((error) => {
          const toast = this.toastCtrl.create({
            message: 'Could not take photo. Please try again',
            duration: 2500
          });
          toast.present();
          this.camera.cleanup();
        });
    }

    onSubmit(form: NgForm) {
      this.inspectionService.submitInspection(form, this.token)
        .subscribe((data) => {
          if(data) {
            console.log(data);
            // this.inspectionService.uploadPhoto(this.imageUrl, this.token)
            //   .then((response) => {
            //     console.log('img upload successful ' + response);
            //   })
            //   .catch((error) => {
            //     console.log('img upload failed ' + error);
            //   });
          } else {
            console.log('error');
          }
        });
    }

}
