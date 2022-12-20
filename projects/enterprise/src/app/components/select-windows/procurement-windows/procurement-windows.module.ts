import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectProcurementComponent } from './select-procurement/select-procurement.component';



@NgModule({
  declarations: [
    SelectProcurementComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class ProcurementWindowsModule { }
