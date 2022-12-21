import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectMemberComponent } from './select-member/select-member.component';



@NgModule({
  declarations: [
    SelectMemberComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule
  ],
  exports: [
    SelectMemberComponent
  ]
})
export class MembersWindowsModule { }
