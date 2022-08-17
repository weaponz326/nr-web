import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { FrequentQuestionsComponent } from './frequent-questions/frequent-questions.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    GettingStartedComponent,
    FrequentQuestionsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HelpInfoModule { }
