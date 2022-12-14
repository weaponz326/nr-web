import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Employees", url: "/home/employees/all-employees" },
  ];

  employeesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountEmployee(1, 20, "-created_at");
  }

  getAccountEmployee(page: any, size: any, sortField: any){
    this.isFetchingGridData =  true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountEmployee(1, 20, column);

    this.currentSortColumn = column;
  }

  viewEmployee(employeeId: any){
    console.log(employeeId);

    sessionStorage.setItem("enterprise_employee_id", employeeId);
    this.router.navigateByUrl("/home/employee/view-employee");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.employeePrint.printAllEmployee();
  }

}
