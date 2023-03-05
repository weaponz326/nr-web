import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectReceivableComponent } from './select-receivable/select-receivable.component';



@NgModule({
  declarations: [
    SelectReceivableComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectReceivableComponent
  ]
})
export class ReceivablesWindowsModule { }
