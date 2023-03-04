import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss']
})
export class EmployeesPage implements OnInit {

  constructor(private router: Router) { }

  navLinks: any[] = [
    { text: "All Employees", url: "/home/employees/all-employees", icon: "bi bi-list-ul" },
    { text: "New Employee", url: "/home/employees/new-employee", icon: "bi bi-plus-square" }
  ]

  ngOnInit(): void {
  }

  gotoConfig(){
    console.log('going...');
    this.router.navigateByUrl("/home/employees/configuration");
  }

}
