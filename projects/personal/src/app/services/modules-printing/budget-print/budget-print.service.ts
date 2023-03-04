import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from '../../module-utilities/pdf-print/pdf-print.service';
import { BudgetApiService } from '../../modules-api/budget-api/budget-api.service';


@Injectable({
  providedIn: 'root'
})
export class BudgetPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private budgetApi: BudgetApiService,
  ) { }

  // all budget

  async printAllBudget(){
    const results$ = this.budgetApi.getUserBudgets(1, 100, "");
    const budgetGridData: any = await lastValueFrom(results$)

    var body = [['Budget Name', 'Budget Type']];

    for (let data of budgetGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.budget_name);
      row.push(rowData.budget_type);
      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['60%', '40%'],
          body: body
        }
      }
    ]

    var header = 'netRink Personal - All Budgets';
    this.pdfPrint.openPdf(header, content);
  }

  // view budget

  async printViewBudget(){
    const budgetFormResults$ = this.budgetApi.getBudget();
    const incomeGridResults$ = this.budgetApi.getBudgetIncome();
    const expenditureGridResults$ = this.budgetApi.getBudgetExpenditure();

    const budgetFormData: any = await lastValueFrom(budgetFormResults$);
    const incomeGridData: any = await lastValueFrom(incomeGridResults$);
    const expenditureGridData: any = await lastValueFrom(expenditureGridResults$);

    // budget

    var budgetBody = [
      ['Budget Name',  ':', budgetFormData.budget_name],
      ['Budget Type',  ':', budgetFormData.budget_type],
    ];

    // income

    var incomeBody = [['Item No.', 'Description', 'Amount']];

    for (let data of incomeGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.item_number);
      row.push(rowData.item_description);
      row.push(rowData.amount);
      incomeBody.push(row);
    }

    let totalIncome = 0;
    for (let income of incomeGridData){
      let rowData: any = income;
      totalIncome += +rowData.amount
    }
    incomeBody.push(['', '', totalIncome.toString()]);

    // expenditure

    var expenditureBody = [['Item No.', 'Description', 'Amount']];

    for (let data of expenditureGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.item_number);
      row.push(rowData.item_description);
      row.push(rowData.amount);
      expenditureBody.push(row);
    }

    let totalExpenditure = 0;
    for (let expenditure of expenditureGridData){
      let rowData: any = expenditure;
      totalExpenditure += +rowData.amount
    }
    expenditureBody.push(['', '', totalExpenditure.toString()]);

    let content = [
      {
        columns: [
          [
            {
              layout: 'noBorders',
              table: {
                headerRows: 0,
                widths: ['33%', '2%', '65%'],
                body: budgetBody
              }
            }
          ],
          [
            { text: 'Income over Expenditure', bold: true, alignment: 'center' },
            { text: '$' + (totalIncome - totalExpenditure), bold: true, alignment: 'center' }
          ]
        ]
      },

      {
        columns: [
          [
            { text: 'Income', bold: true, margin: [0, 20, 0, 10] },
            {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                // widths: ['15%', '25%', '60%'],
                body: incomeBody
              }
            }
          ],
          [
            { text: 'Expenditure', bold: true, margin: [0, 20, 0, 10] },
            {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                // widths: ['15%', '25%', '60%'],
                body: expenditureBody
              }
            }
          ]
        ],
        columnGap: 20
      }
    ]

    var header = 'netRink Personal - View Budget';
    this.pdfPrint.openPdf(header, content);
  }

}
