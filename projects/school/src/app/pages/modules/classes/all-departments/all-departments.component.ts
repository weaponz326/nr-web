import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { ClassesApiService } from 'projects/school/src/app/services/modules-api/classes-api/classes-api.service';
// import { ClassesPrintService } from 'projects/school/src/app/services/printing/classes-print/classes-print.service';


@Component({
  selector: 'app-all-departments',
  templateUrl: './all-departments.component.html',
  styleUrls: ['./all-departments.component.scss']
})
export class AllDepartmentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private classesApi: ClassesApiService,
    // private classesPrint: ClassesPrintService
  ) { }

  @ViewChild('addDepartmentComponentReference', { read: AddDepartmentComponent, static: false }) addDepartment!: AddDepartmentComponent;
  @ViewChild('editDepartmentComponentReference', { read: EditDepartmentComponent, static: false }) editDepartment!: EditDepartmentComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Departments", url: "/home/departments/all-departments" },
  ];

  activeTermName: any;

  departmentsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  deleteId: any;

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountDepartment(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountDepartment(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.classesApi.getAccountDepartment(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.departmentsGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountDepartment(1, 20, column);

    this.currentSortColumn = column;
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountDepartment(1, 20, "-created_at");
  }

  viewDepartment(departmentId: any){
    console.log(departmentId);

    sessionStorage.setItem('school_department_id', departmentId);
    this.router.navigateByUrl('/home/classes/view-department');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.classesPrint.printAllDepartments()
  }

}
