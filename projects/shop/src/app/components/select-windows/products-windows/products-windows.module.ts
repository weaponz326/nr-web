import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectProductComponent } from './select-product/select-product.component';



@NgModule({
  declarations: [
    SelectProductComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectProductComponent
  ]
})
export class ProductsWindowsModule { }
