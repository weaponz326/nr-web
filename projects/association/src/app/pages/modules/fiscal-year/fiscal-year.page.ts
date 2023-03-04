import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.page.html',
  styleUrls: ['./fiscal-year.page.scss']
})
export class FiscalYearPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Fiscal Years", url: "/home/fiscal-year/all-years", icon: "bi bi-list-ul" },
    { text: "Add Fiscal Year", url: "/home/fiscal-year/add-year", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/fiscal-year/configuration");
  }

}
