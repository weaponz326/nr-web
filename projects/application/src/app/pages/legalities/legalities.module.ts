import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalitiesRoutingModule } from './legalities-routing.module';
import { MainNavbarModule } from '../../components/main-navbar/main-navbar.module';

import { LegalitiesPage } from './legalities.page';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';


@NgModule({
  declarations: [
    LegalitiesPage,
    TermsComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    LegalitiesRoutingModule,
    MainNavbarModule
  ]
})
export class LegalitiesModule { }
