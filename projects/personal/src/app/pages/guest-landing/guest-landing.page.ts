import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from '../../services/auth/auth-api/auth-api.service';

@Component({
  selector: 'app-guest-landing',
  templateUrl: './guest-landing.page.html',
  styleUrls: ['./guest-landing.page.scss']
})
export class GuestLandingPage implements OnInit {

  constructor(
    private router: Router,
    private authApi: AuthApiService,
  ) { }

  isLoading: boolean = false;

  ngOnInit(): void {
  }

  gotoAbout() {
    console.log('to about...');
    document.querySelector('#aboutComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoPricing() {
    console.log('to pricing...');
    document.querySelector('#pricingComponentReference')?.scrollIntoView({ behavior: 'smooth'});
  }

  gotoContact() {
    console.log('to contact...');
    document.querySelector('#contactComponentReference')?.scrollIntoView({ behavior: 'smooth'});
  }

}
