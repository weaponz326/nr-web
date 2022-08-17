import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';



@NgModule({
  declarations: [
    TermsComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LegalitiesModule { }
