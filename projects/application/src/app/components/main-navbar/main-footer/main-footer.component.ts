import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/application/src/environments/environment';


@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

  constructor() { }

  baseUrl: string = environment.baseUrl;
  personalUrl: string = environment.personalUrl;
  restaurantUrl: string = environment.restaurantUrl;
  schoolUrl: string = environment.schoolUrl;
  enterpriseUrl: string = environment.enterpriseUrl;
  associationUrl: string = environment.associationUrl;
  hospitalUrl: string = environment.hospitalUrl;
  hotelUrl: string = environment.hotelUrl;
  shopUrl: string = environment.shopUrl;
  productionUrl: string = environment.productionUrl;

  ngOnInit(): void {
  }

}
