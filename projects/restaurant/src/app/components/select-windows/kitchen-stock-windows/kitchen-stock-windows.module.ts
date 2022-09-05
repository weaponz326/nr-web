import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectStockItemComponent } from './select-stock-item/select-stock-item.component';



@NgModule({
  declarations: [
    SelectStockItemComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectStockItemComponent
  ]
})
export class KitchenStockWindowsModule { }
