import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectFeesComponent } from './select-fees/select-fees.component';
import { SelectBillComponent } from './select-bill/select-bill.component';


@NgModule({
  declarations: [
    SelectFeesComponent,
    SelectBillComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectFeesComponent,
    SelectBillComponent
  ]
})
export class FeesWindowsModule { }
