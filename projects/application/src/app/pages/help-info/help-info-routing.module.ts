import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelpInfoPage } from './help-info.page';
import { AddingUsersComponent } from './articles-contents/adding-users/adding-users.component';
import { GettingStartedComponent } from './articles-contents/getting-started/getting-started.component';
import { InfrastructureComponent } from './articles-contents/infrastructure/infrastructure.component';
import { HelpHomeComponent } from './help-home/help-home.component';


const routes: Routes = [
  { 
    path: "", 
    component: HelpInfoPage,
    children: [
      { path: "", component: HelpHomeComponent },
      { path: "articles/getting-started", component: GettingStartedComponent },
      { path: "articles/infrastructure", component: InfrastructureComponent },
      { path: "articles/adding-users", component: AddingUsersComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpInfoRoutingModule { }
