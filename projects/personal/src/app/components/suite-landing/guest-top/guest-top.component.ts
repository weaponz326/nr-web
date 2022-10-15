import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Component({
  selector: 'app-guest-top',
  templateUrl: './guest-top.component.html',
  styleUrls: ['./guest-top.component.scss']
})
export class GuestTopComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @Input() suiteName: string = "";
  @Input() primaryCaption: string = "";
  @Input() secondaryCaption: string = "";
  @Input() features: any;
  @Input() demoVideoUrl: any;

  ngOnInit(): void {
  }

  createAccount(e: any){
    e.preventDefault();
    console.log("u are about to create an account or accounts");

    if (this.suiteName != "nR Personal"){
      sessionStorage.setItem("isSuiteRegistration", "OK");

      if (this.customCookie.getCookie('personal_id'))
        this.router.navigateByUrl("/register");
      else
        this.router.navigateByUrl("/auth/login");
    }
    else{
      sessionStorage.removeItem("isSuiteRegistration");
      this.router.navigateByUrl("/auth/register");
    }
  }

}
