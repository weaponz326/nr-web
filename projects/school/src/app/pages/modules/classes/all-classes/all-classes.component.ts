import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewClassComponent } from '../new-class/new-class.component';
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { ClassesApiService } from 'projects/school/src/app/services/modules-api/classes-api/classes-api.service';
// import { ClassesPrintService } from 'projects/school/src/app/services/printing/classes-print/classes-print.service';


@Component({
  selector: 'app-all-classes',
  templateUrl: './all-classes.component.html',
  styleUrls: ['./all-classes.component.scss']
})
export class AllClassesComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private classesApi: ClassesApiService,
    // private classesPrint: ClassesPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newClassComponentReference', { read: NewClassComponent, static: false }) newClass!: NewClassComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Classes", url: "/home/classes/all-classes" },
  ];

  activeTermName: any;

  classesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountClass(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountClass(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.classesApi.getAccountClass(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.classesGridData = res.results;

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
    this.getAccountClass(1, 20, column);

    this.currentSortColumn = column;
  }

  viewClass(classId: any){
    console.log(classId);

    sessionStorage.setItem('school_class_id', classId);
    this.router.navigateByUrl('/home/classes/view-class');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountClass(1, 20, "-created_at");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.classesPrint.printAllClasses();
  }

}
