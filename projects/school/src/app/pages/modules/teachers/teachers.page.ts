import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss']
})
export class TeachersPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Teachers", url: "/home/teachers/all-teachers", icon: "bi bi-list-ul" },
    { text: "New Teacher", url: "/home/teachers/new-teacher", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
