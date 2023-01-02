import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-landing',
  templateUrl: './guest-landing.page.html',
  styleUrls: ['./guest-landing.page.scss']
})
export class GuestLandingPage implements OnInit {

  constructor() { }

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

  watchDemo(){
    console.log("so u wanna watch the demo erh!");
    window.open('#', "_blank") || window.location.replace('#');
  }

}
