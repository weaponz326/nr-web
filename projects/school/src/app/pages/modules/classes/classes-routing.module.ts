import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassesPage } from './classes.page';
import { AllClassesComponent } from './all-classes/all-classes.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { NewClassComponent } from './new-class/new-class.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';


const routes: Routes = [
  {
    path: "",
    component: ClassesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-classes", component: AllClassesComponent },
      { path: "new-class", component: NewClassComponent },
      { path: "view-class", component: ViewClassComponent },
      { path: "all-departments", component: AllDepartmentsComponent },
      { path: "new-department", component: AddDepartmentComponent },
      { path: "view-department", component: EditDepartmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
