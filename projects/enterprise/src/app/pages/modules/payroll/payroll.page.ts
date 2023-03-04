import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.page.html',
  styleUrls: ['./payroll.page.scss']
})
export class PayrollPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Payroll", url: "/home/payroll/all-payroll", icon: "bi bi-list-ul" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/payroll/configuration");
  }

}
