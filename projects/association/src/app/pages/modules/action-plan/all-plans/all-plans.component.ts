import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewPlanComponent } from '../new-plan/new-plan.component';


@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss']
})
export class AllPlansComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newPlanComponentReference', { read: NewPlanComponent, static: false }) newPlan!: NewPlanComponent;

  navHeading: any[] = [
    { text: "All Plans", url: "/home/action-plan/all-plans" },
  ];

  plansGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  getAccountActionPlan(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;


  }

  sortTable(column: any){
    console.log(column);
    this.getAccountActionPlan(1, 20, column);

    this.currentSortColumn = column;
  }

  viewMember(planId: any){
    console.log(planId);

    sessionStorage.setItem('association_action_plan_id', planId);
    this.router.navigateByUrl('/home/action-plan/view-plan');
  }


  onPrint(){
    console.log("lets start printing...");
    // this.membersPrint.printAllMembers();
  }

}
