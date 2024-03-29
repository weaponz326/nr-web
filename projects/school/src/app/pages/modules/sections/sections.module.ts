import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SectionsRoutingModule } from './sections-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { TermsWindowsModule } from '../../../components/select-windows/terms-windows/terms-windows.module';
import { StudentsWindowsModule } from '../../../components/select-windows/students-windows/students-windows.module';

import { SectionsPage } from './sections.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllSectionsComponent } from './all-sections/all-sections.component';
import { NewSectionComponent } from './new-section/new-section.component';
import { ViewSectionComponent } from './view-section/view-section.component';
import { SectionStudentsComponent } from './section-students/section-students.component';
import { SectionFormComponent } from './section-form/section-form.component';


@NgModule({
  declarations: [
    SectionsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllSectionsComponent,
    NewSectionComponent,
    ViewSectionComponent,
    SectionStudentsComponent,
    SectionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SectionsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    TermsWindowsModule,
    StudentsWindowsModule
  ]
})
export class SectionsModule { }
