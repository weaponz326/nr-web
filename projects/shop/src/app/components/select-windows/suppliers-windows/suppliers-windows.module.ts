import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectSupplierComponent } from './select-supplier/select-supplier.component';



@NgModule({
  declarations: [
    SelectSupplierComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectSupplierComponent
  ]
})
export class SuppliersWindowsModule { }
