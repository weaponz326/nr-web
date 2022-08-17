import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor() { }

  @Input() source: string = "Personal";
  @Input() navBrand: string = "netRink";
  @Input() isForms: boolean = false;

  userData: any;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  name: string = "";
  email: string = "";
  photo: string = "../../../../assets/images/utilities/photo-avatar.jpg";

  ngOnInit(): void {
    this.getAuth();
    this.getUser();

    if(!this.isForms){
      this.setSource();
    }
  }

  setSource(){
    sessionStorage.setItem('app_source', this.navBrand);
  }

  getAuth(){
    this.isAuthLoading = true;
    
    // TODO:
  }

  getUser(){
    // TODO:
  }

  logout(e: any){
    e.stopPropagation();
    console.log("u logging out? ...where u going?");
    
    // TODO:
  }


}
