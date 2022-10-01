import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
// import { ParentsApiService } from 'projects/school/src/app/services/modules/parents-api/parents-api.service';
// import { ParentsPrintService } from 'projects/school/src/app/services/printing/parents-print/parents-print.service';


@Component({
  selector: 'app-all-parents',
  templateUrl: './all-parents.component.html',
  styleUrls: ['./all-parents.component.scss']
})
export class AllParentsComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    // private parentsApi: ParentsApiService,
    // private parentsPrint: ParentsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Parents", url: "/home/parents/all-parents" },
  ];

  parentsGridData: any[] = [];

  activeTermName: any;

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    // this.getActiveTerm();
    this.getAccountParent();
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountParent(){
    this.isFetchingGridData = true;

    // this.parentsApi.getAccountParent(this.sortParams, 20)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.parentsGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountParent();

    this.currentSortColumn = column;
  }

  viewParent(parentId: any){
    console.log(parentId);

    sessionStorage.setItem('school_parent_id', parentId);
    this.router.navigateByUrl('/home/parents/view-parent');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountParent();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.parentsPrint.printAllParents();
  }

}
