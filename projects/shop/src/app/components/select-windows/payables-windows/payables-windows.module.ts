import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectPayableComponent } from './select-payable/select-payable.component';



@NgModule({
  declarations: [
    SelectPayableComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectPayableComponent
  ]
})
export class PayablesWindowsModule { }
