import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectSectionComponent } from './select-section/select-section.component';



@NgModule({
  declarations: [
    SelectSectionComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectSectionComponent
  ]
})
export class SectionsWindowsModule { }
