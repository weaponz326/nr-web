import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss']
})
export class SalesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Sales", url: "/home/sales/all-sales", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
