import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectExecutiveComponent } from './select-executive/select-executive.component';



@NgModule({
  declarations: [
    SelectExecutiveComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectExecutiveComponent
  ]
})
export class ExecutivesWindowsModule { }
