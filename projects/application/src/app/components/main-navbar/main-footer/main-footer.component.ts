import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

  constructor() { }

  baseUrl: string = "#";
  personalUrl: string = "#";
  restaurantUrl: string = "#";
  schoolUrl: string = "#";
  enterpriseUrl: string = "#";
  associationUrl: string = "#";
  hospitalUrl: string = "#";
  hotelUrl: string = "#";
  shopUrl: string = "#";
  productionUrl: string = "#";

  ngOnInit(): void {
  }

}
