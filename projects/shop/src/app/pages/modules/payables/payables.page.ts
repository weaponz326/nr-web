import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payables',
  templateUrl: './payables.page.html',
  styleUrls: ['./payables.page.scss']
})
export class PayablesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Payables", url: "/home/payables/all-payables", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
