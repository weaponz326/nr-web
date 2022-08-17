import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalitiesRoutingModule } from './legalities-routing.module';
import { LegalitiesPage } from './legalities.page';


@NgModule({
  declarations: [
    LegalitiesPage
  ],
  imports: [
    CommonModule,
    LegalitiesRoutingModule
  ]
})
export class LegalitiesModule { }
