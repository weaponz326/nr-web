import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss']
})
export class BudgetPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Budgets", url: "/home/budget/all-budget", icon: "bi bi-list-ul" }
  ]
  
  ngOnInit(): void {
  }

}
