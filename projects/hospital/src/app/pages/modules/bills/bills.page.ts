import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss']
})
export class BillsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Bills", url: "/home/bills/all-bills", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
