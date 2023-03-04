import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.page.html',
  styleUrls: ['./cashflow.page.scss']
})
export class CashflowPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Sheets", url: "/home/cashflow/all-sheets", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/cashflow/configuration");
  }

}
