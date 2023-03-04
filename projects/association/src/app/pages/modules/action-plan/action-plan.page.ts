import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.page.html',
  styleUrls: ['./action-plan.page.scss']
})
export class ActionPlanPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Plans", url: "/home/action-plan/all-plans", icon: "bi bi-list-ul" },
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/action-plan/configuration");
  }

}
