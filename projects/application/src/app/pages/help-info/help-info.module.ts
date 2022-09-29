import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HelpInfoRoutingModule } from './help-info-routing.module';
import { MainNavbarModule } from '../../components/main-navbar/main-navbar.module';

import { HelpInfoPage } from './help-info.page';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { GettingStartedComponent } from './articles-contents/getting-started/getting-started.component';
import { InfrastructureComponent } from './articles-contents/infrastructure/infrastructure.component';
import { AddingUsersComponent } from './articles-contents/adding-users/adding-users.component';
import { ArticlesComponent } from './articles/articles.component';
import { HelpHomeComponent } from './help-home/help-home.component';


@NgModule({
  declarations: [
    HelpInfoPage,
    FaqComponent,
    ContactComponent,
    GettingStartedComponent,
    InfrastructureComponent,
    AddingUsersComponent,
    ArticlesComponent,
    HelpHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HelpInfoRoutingModule,
    MainNavbarModule
  ]
})
export class HelpInfoModule { }
