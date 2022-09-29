import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalitiesPage } from './legalities.page';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { 
    path: "", 
    component: LegalitiesPage,
    children: [
      { path: "", component: TermsComponent },
      { path: "terms", component: TermsComponent },
      { path: "privacy", component: PrivacyComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalitiesRoutingModule { }
