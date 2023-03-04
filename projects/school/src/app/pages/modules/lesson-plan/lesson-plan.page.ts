import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.page.html',
  styleUrls: ['./lesson-plan.page.scss']
})
export class LessonPlanPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Plans", url: "/home/lesson-plan/all-plans", icon: "bi bi-list-ul" },
    { text: "New Plan", url: "/home/lesson-plan/new-plan", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/lesson-plan/configuration");
  }

}
