import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeesPage } from './fees.page';
import { ClassBillsComponent } from './class-bills/class-bills.component';
import { StudentBillComponent } from './student-bill/student-bill.component';
import { AllFeesComponent } from './all-fees/all-fees.component';
import { ViewFeesComponent } from './view-fees/view-fees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateFeesComponent } from './create-fees/create-fees.component';


const routes: Routes = [
  {
    path: "",
    component: FeesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "class-bills", component: ClassBillsComponent },
      { path: "student-bill", component: StudentBillComponent },
      { path: "all-fees", component: AllFeesComponent },
      { path: "create-fees", component: CreateFeesComponent },
      { path: "view-fees", component: ViewFeesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
