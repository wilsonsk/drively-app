import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleInspectionPage } from './vehicle-inspection';

@NgModule({
  declarations: [
    VehicleInspectionPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleInspectionPage),
  ],
})
export class VehicleInspectionPageModule {}
