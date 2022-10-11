import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss']
})
export class ReportsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Reports", url: "/home/reports/all-reports", icon: "bi bi-list-ul" },
    { text: "New Report", url: "/home/reports/new-report", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
