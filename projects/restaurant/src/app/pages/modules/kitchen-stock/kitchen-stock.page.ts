import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-kitchen-stock',
  templateUrl: './kitchen-stock.page.html',
  styleUrls: ['./kitchen-stock.page.scss']
})
export class KitchenStockPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Items", url: "/home/kitchen-stock/all-stock-items", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/kitchen-stock/configuration");
  }

}
