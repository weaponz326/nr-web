import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Task Groups", url: "/home/tasks/all-task-groups", icon: "bi bi-list-ul" },
    { text: "All Task Items", url: "/home/tasks/all-task-items", icon: "bi bi-list-ul" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/tasks/configuration");
  }

}
