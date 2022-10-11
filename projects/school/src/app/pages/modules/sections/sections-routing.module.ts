import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SectionsPage } from './sections.page';
import { AllSectionsComponent } from './all-sections/all-sections.component';
import { ViewSectionComponent } from './view-section/view-section.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NewSectionComponent } from './new-section/new-section.component';


const routes: Routes = [
  {
    path: "",
    component: SectionsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-sections", component: AllSectionsComponent },
      { path: "new-section", component: NewSectionComponent },
      { path: "view-section", component: ViewSectionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }
