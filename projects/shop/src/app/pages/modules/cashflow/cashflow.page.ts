import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.page.html',
  styleUrls: ['./cashflow.page.scss']
})
export class CashflowPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Sheets", url: "/home/cashflow/all-sheets", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

}
