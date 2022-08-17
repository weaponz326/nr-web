import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainNavbarComponent,
    MainFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainNavbarComponent,
    MainFooterComponent
  ]
})
export class MainNavbarModule { }
