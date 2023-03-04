import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss']
})
export class InvoicePage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Invoice", url: "/home/invoice/all-invoice", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
