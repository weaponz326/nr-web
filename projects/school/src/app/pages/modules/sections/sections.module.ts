import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsPage } from './sections.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllSectionsComponent } from './all-sections/all-sections.component';
import { NewSectionComponent } from './new-section/new-section.component';
import { ViewSectionComponent } from './view-section/view-section.component';
import { SectionStudentsComponent } from './section-students/section-students.component';


@NgModule({
  declarations: [
    SectionsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllSectionsComponent,
    NewSectionComponent,
    ViewSectionComponent,
    SectionStudentsComponent
  ],
  imports: [
    CommonModule,
    SectionsRoutingModule
  ]
})
export class SectionsModule { }
