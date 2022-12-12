import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss']
})
export class EmployeesPage implements OnInit {

  constructor() { }

  navLinks: any[] = [
    { text: "All Employees", url: "/home/employees/all-employees", icon: "bi bi-list-ul" },
    { text: "New Employee", url: "/home/employees/new-employee", icon: "bi bi-plus-square" }
  ]

  ngOnInit(): void {
  }

}
