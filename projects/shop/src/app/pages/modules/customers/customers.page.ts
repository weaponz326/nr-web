import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss']
})
export class CustomersPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Customers", url: "/home/customers/all-customers", icon: "bi bi-list-ul" },
    { text: "New Customer", url: "/home/customers/new-customer", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/customers/configuration");
  }
  
}
