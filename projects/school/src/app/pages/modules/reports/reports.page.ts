import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss']
})
export class ReportsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Reports", url: "/home/reports/all-reports", icon: "bi bi-list-ul" },
    { text: "New Report", url: "/home/reports/new-report", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/reports/configuration");
  }

}
