import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SelectSentLetterComponent } from './select-sent-letter/select-sent-letter.component';
import { SelectReceivedLetterComponent } from './select-received-letter/select-received-letter.component';



@NgModule({
  declarations: [
    SelectSentLetterComponent,
    SelectReceivedLetterComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ]
})
export class LettersWindowsModule { }
