import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss']
})
export class PayrollPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Payroll", url: "/home/payroll/all-payroll", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

}
