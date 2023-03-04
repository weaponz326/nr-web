import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss']
})
export class CustomersPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Customers", url: "/home/customers/all-customers", icon: "bi bi-list-ul" },
    { text: "New Customer", url: "/home/customers/new-customer", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
