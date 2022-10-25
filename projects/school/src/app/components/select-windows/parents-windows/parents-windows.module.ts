import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectParentComponent } from './select-parent/select-parent.component';



@NgModule({
  declarations: [
    SelectParentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectParentComponent
  ]
})
export class ParentsWindowsModule { }
