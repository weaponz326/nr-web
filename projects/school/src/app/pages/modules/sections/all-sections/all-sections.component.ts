import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewSectionComponent } from '../new-section/new-section.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { SectionsApiService } from 'projects/school/src/app/services/modules-api/sections-api/sections-api.service';
// import { SectionsPrintService } from 'projects/school/src/app/services/printing/sections-print/sections-print.service';


@Component({
  selector: 'app-all-sections',
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.scss']
})
export class AllSectionsComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private sectionsApi: SectionsApiService,
    // private sectionPrint: SectionPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newSectionComponentReference', { read: NewSectionComponent, static: false }) newSection!: NewSectionComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Section", url: "/home/sections/all-sections" },
  ];

  activeTermName: any;

  sectionsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountSection(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountSection(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.sectionsApi.getAccountSection(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.sectionsGridData = res.results;

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
    this.getAccountSection(1, 20, column);

    this.currentSortColumn = column;
  }

  viewSection(sectionId: any){
    console.log(sectionId);

    sessionStorage.setItem('school_section_id', sectionId);
    this.router.navigateByUrl('/home/sections/view-section');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountSection(1, 20, "-created_at");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.sectionPrint.printAllSection();
  }

}
