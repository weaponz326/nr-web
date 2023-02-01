import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectBookingComponent } from './select-booking/select-booking.component';



@NgModule({
  declarations: [
    SelectBookingComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectBookingComponent
  ]
})
export class BookingsWindowsModule { }
