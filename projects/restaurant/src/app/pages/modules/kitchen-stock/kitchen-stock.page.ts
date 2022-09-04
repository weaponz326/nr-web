import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen-stock',
  templateUrl: './kitchen-stock.page.html',
  styleUrls: ['./kitchen-stock.page.scss']
})
export class KitchenStockPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Items", url: "/home/kitchen-stock/all-stock-items", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
