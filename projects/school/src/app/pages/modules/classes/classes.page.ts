import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss']
})
export class ClassesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Classes", url: "/home/classes/all-classes", icon: "bi bi-list-ul" },
    { text: "New Class", url: "/home/classes/new-class", icon: "bi bi-plus-square" },
    { text: "All Departments", url: "/home/classes/all-departments", icon: "bi bi-list-ul" },
    { text: "New Department", url: "/home/classes/new-department", icon: "bi bi-plus-square" },
  ]
  
  ngOnInit(): void {
  }

}
