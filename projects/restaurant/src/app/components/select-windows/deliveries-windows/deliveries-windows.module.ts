import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectDeliveryComponent } from './select-delivery/select-delivery.component';



@NgModule({
  declarations: [
    SelectDeliveryComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectDeliveryComponent
  ]
})
export class DeliveriesWindowsModule { }
