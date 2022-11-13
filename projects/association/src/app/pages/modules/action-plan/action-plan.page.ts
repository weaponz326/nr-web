import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.page.html',
  styleUrls: ['./action-plan.page.scss']
})
export class ActionPlanPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Plans", url: "/home/action-plan/all-plans", icon: "bi bi-list-ul" },
    { text: "New Plan", url: "/home/action-plan/new-plan", icon: "bi bi-plus-square" },
  ]

  ngOnInit(): void {
  }

}
