import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';

// import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'


@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor(private authApi: AuthApiService) { }

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
    this.getUser();

    if(!this.isForms){
      this.setSource();
    }
  }

  setSource(){
    sessionStorage.setItem('app_source', this.navBrand);
  }

  getUser(){
    this.isAuthLoading = true;

    this.authApi.getUser()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id) {
            this.isLoggedIn = true;
            this.name = res.first_name;
            this.email = res.email;
            if(res.photo != null) this.photo = environment.personalUrl + res.photo;

            let full_name = res.first_name + " " + res.last_name;;
            localStorage.setItem('personal_id', res.id);
            sessionStorage.setItem('personal_name', full_name);

            this.isAuthLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoggedIn = false;

          this.isAuthLoading = false;
        }
      })
  }

  logout(e: any){
    e.stopPropagation();
    console.log("u logging out? ...where u think u going?");
    
    localStorage.removeItem("auth_token");
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
  }


}
