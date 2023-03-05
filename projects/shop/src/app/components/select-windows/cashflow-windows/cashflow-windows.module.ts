import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectSheetComponent } from './select-sheet/select-sheet.component';



@NgModule({
  declarations: [
    SelectSheetComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectSheetComponent
  ]
})
export class CashflowWindowsModule { }
