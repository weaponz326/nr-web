import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss']
})
export class StudentsPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Students", url: "/home/students/all-students", icon: "bi bi-list-ul" },
    { text: "New Student", url: "/home/students/new-student", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

}
