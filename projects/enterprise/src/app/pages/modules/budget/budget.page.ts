import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss']
})
export class BudgetPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Budgets", url: "/home/budget/all-budget", icon: "bi bi-list-ul" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/budget/configuration");
  }

}
