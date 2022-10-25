import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectTermComponent } from './select-term/select-term.component';



@NgModule({
  declarations: [
    SelectTermComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectTermComponent
  ]
})
export class TermsWindowsModule { }
