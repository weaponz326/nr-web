import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectPurchasingComponent } from './select-purchasing/select-purchasing.component';



@NgModule({
  declarations: [
    SelectPurchasingComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectPurchasingComponent
  ]
})
export class PurchasingWindowsModule { }
