import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  ngOnInit(): void {
  }

  register(e: any){
    e.preventDefault();

    if(!this.customCookie.getCookie('personal_id')){
      this.router.navigateByUrl('/auth/signup')
    }
    else{
      try{
        this.router.navigateByUrl('register');
      }
      catch{
        console.log('where u thinking of going? ...huh?');
      }
    }
  }

}
