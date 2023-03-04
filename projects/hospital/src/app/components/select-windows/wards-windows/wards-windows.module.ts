import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectWardComponent } from './select-ward/select-ward.component';



@NgModule({
  declarations: [
    SelectWardComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectWardComponent
  ]
})
export class WardsWindowsModule { }
