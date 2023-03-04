import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss']
})
export class StudentsPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Students", url: "/home/students/all-students", icon: "bi bi-list-ul" },
    { text: "New Student", url: "/home/students/new-student", icon: "bi bi-plus-square" }
  ]
  
  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/students/configuration");
  }

}
