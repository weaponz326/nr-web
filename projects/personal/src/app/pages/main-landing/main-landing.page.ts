import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-landing',
  templateUrl: './main-landing.page.html',
  styleUrls: ['./main-landing.page.scss']
})
export class MainLandingPage implements OnInit {

  constructor() { }
  
  personalUrl = "#";
  hospitalUrl = "#";
  restaurantUrl = "#";
  schoolUrl = "#";
  enterpriseUrl = "#";
  associationUrl = "#";
  hotelUrl = "#";
  shopUrl = "#";
  productionUrl = "#";

  ngOnInit(): void {
  }

  gotoPersonal() {
    document.querySelector('#personalComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoHospital() {
    document.querySelector('#hospitalComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoRestaurant() {
    document.querySelector('#restaurantComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoSchool() {
    document.querySelector('#schoolComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoEnterprise() {
    document.querySelector('#enterpriseComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoAssociation() {
    document.querySelector('#associationComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoHotel() {
    document.querySelector('#hotelComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoShop() {
    document.querySelector('#shopComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

  gotoProduction() {
    document.querySelector('#productionComponentReference')?.scrollIntoView({ behavior: 'smooth' });
  }

}
