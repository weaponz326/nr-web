import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Task Groups", url: "/home/tasks/all-task-groups", icon: "bi bi-list-ul" },
    { text: "All Task Items", url: "/home/tasks/all-task-items", icon: "bi bi-list-ul" }
  ]
  
  ngOnInit(): void {
  }

}
