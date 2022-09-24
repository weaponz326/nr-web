import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

  @Input() source: string = "netRink";
  @Input() navBrand: string = "netRink";
  @Input() isForms: boolean = false;

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  navBrandLink = "/"

  name: string = "";
  email: string = "";
  photo: string = "../../../../assets/images/utilities/photo-avatar.jpg";

  isShowToast = false;
  timer: any;

  ngOnInit(): void {
    this.getUser();

    if(!this.isForms){
      this.setSource();
    }

    if(this.source == "Personal"){
      this.navBrandLink = "/guest";
    }
  }

  setSource(){
    sessionStorage.setItem('app_source', this.navBrand);
  }

  getUser(){
    this.authApi.getUser()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.email) {            
            this.name = res.first_name;
            this.email = res.email;
            if(res.photo != null) this.photo = environment.apiUrl + res.photo;

            let full_name = res.first_name + " " + res.last_name;;
            localStorage.setItem('personal_id', res.id);
            sessionStorage.setItem('personal_name', full_name);

            this.isLoggedIn = true;
            this.isAuthLoading = false;
          }
        },
        error: (err) => {
          console.log(err);          
          this.openToast();

          this.isLoggedIn = false;
          this.isAuthLoading = false;
        }
      })
  }

  postLogout(e: any){
    e.stopPropagation();
    console.log("u logging out? ...where u think u going?");

    this.authApi.postLogout()
      .subscribe({
        next: (res) => {
          console.log(res);

          localStorage.removeItem("token");

          localStorage.removeItem("personal_id");
          localStorage.removeItem("hospital_id");
          localStorage.removeItem("restaurant_id");
          localStorage.removeItem("school_id");
          localStorage.removeItem("enterprise_id");
          localStorage.removeItem("association_id");
          localStorage.removeItem("hotel_id");
          localStorage.removeItem("shop_id");
          localStorage.removeItem("production_id");

          window.location.href = "/";  
        },
        error: (err) => {
          console.log(err);
          this.openToast();
        }
      })
  }

  openToast(){
    console.log("opening connection toast");
    this.isShowToast = true;

    var timer = setInterval(() => {
      this.isShowToast = false;
      clearInterval(timer);
      console.log("closing toast...", timer);
    }, 3000);
  }

}
