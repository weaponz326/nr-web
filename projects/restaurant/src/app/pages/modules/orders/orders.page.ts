import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss']
})
export class OrdersPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Orders", url: "/home/orders/all-orders", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
