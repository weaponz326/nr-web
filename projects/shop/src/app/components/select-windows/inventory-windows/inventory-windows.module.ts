import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectInventoryComponent } from './select-inventory/select-inventory.component';



@NgModule({
  declarations: [
    SelectInventoryComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectInventoryComponent
  ]
})
export class InventoryWindowsModule { }
