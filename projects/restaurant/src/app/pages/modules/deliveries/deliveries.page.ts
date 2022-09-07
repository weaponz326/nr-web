import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss']
})
export class DeliveriesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Deliveries", url: "/home/deliveries/all-deliveries", icon: "bi bi-list-ul" },
    { text: "Add Delivery", url: "/home/deliveries/add-delivery", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
