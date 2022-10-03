import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';
import { BudgetApiService } from 'projects/personal/src/app/services/modules-api/budget-api/budget-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private budgetApi: BudgetApiService
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Dashboard", url: "/home/budget/dashboard" },
  ];

  ioeMonthDataSets: any[] = [0,0];
  ioeMonthDataLabels: any[] = ['Income', 'Expenditure'];

  budgetMonthCount: number = 0;
  incomeMonthTotal: number = 0;
  expenditureMonthTotal: number = 0;

  ioePieChartConfig: any;

  ngOnInit(): void {
    this.getBudgetCount();
    this.getIncomeTotal();
    this.getExpenditureTotal();
  }

  ngAfterViewInit(): void {
    this.initIoEPieChart();
  }

  initIoEPieChart(){
    let ioePieChartElement = this.elementRef.nativeElement.querySelector('#ioePieChart')

    this.ioePieChartConfig = new Chart(ioePieChartElement, {
      type: "pie",
      data: {
        labels: this.ioeMonthDataLabels,
        datasets: [{
          data: this.ioeMonthDataSets,
          backgroundColor: ["#ff000088", "#0000ff88"]
        }]
      },
      options: {},
    });
  }

  getBudgetCount(){
    this.budgetApi.getBudgetCount()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.budgetMonthCount = res.count;
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getIncomeTotal(){
    this.budgetApi.getIncomeTotal()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.incomeMonthTotal = res.total.amount__sum;
          this.ioeMonthDataSets[0] = res.total.amount__sum;
          
          this.ioePieChartConfig.destroy();
          this.initIoEPieChart()
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getExpenditureTotal(){
    this.budgetApi.getExpenditureTotal()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.expenditureMonthTotal = res.total.amount__sum;
          this.ioeMonthDataSets[1] = res.total.amount__sum;
          
          this.ioePieChartConfig.destroy();
          this.initIoEPieChart();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
