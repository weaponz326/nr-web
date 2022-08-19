import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SuiteScrollnavComponent } from './suite-scrollnav/suite-scrollnav.component';
import { GuestTopComponent } from './guest-top/guest-top.component';
import { UserTopComponent } from './user-top/user-top.component';
import { AboutComponent } from './about/about.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SuiteScrollnavComponent,
    GuestTopComponent,
    UserTopComponent,
    AboutComponent,
    PricingComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    SuiteScrollnavComponent,
    GuestTopComponent,
    UserTopComponent,
    AboutComponent,
    PricingComponent,
    ContactComponent
  ]
})
export class SuiteLandingModule { }
