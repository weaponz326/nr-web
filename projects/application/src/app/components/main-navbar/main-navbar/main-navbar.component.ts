import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'projects/personal/src/environments/environment';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthApiService } from 'projects/personal/src/app/services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private authApi: AuthApiService
  ) { }

  @Input() source: string = "netRink";
  @Input() navBrand: string = "netRink";
  @Input() isForms: boolean = false;

  @ViewChild('buttonElementReference', { read: ElementRef, static: false }) buttonElement!: ElementRef;

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

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

    this.setNavbrandLink();
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

            this.customCookie.setCookie('personal_id', res.id);
            // localStorage.setItem('personal_id', res.id);

            this.isLoggedIn = true;
            this.isAuthLoading = false;
          }
        },
        error: (err) => {
          console.log(err);          
          // this.openToast();

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

          this.customCookie.removeCookie('token');
          this.customCookie.removeCookie('personal_id');
          this.customCookie.removeCookie('restaurant_id');
          this.customCookie.removeCookie('school_id');

          localStorage.clear();
          sessionStorage.clear();

          window.location.href = "/";
        },
        error: (err) => {
          console.log(err);
          this.openToast();
        }
      })
  }

  setNavbrandLink(){
    console.log(this.source);
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
