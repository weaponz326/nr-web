import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss']
})
export class PaymentsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Payments", url: "/home/payments/all-payments", icon: "bi bi-list-ul" },
    { text: "New Payment", url: "/home/payments/new-payment", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
