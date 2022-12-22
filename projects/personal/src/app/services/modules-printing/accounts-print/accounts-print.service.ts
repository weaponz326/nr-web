import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from '../../module-utilities/pdf-print/pdf-print.service';
import { AccountsApiService } from '../../modules-api/accounts-api/accounts-api.service';


@Injectable({
  providedIn: 'root'
})
export class AccountsPrintService {

  constructor(
    private pdfPrint: PdfPrintService,
    private accountsApi: AccountsApiService,
  ) { }

  // all accounts

  async printAllAccounts(){
    const results$ = this.accountsApi.getUserAccounts(1, 100, "");
    const accountsGridData: any = await lastValueFrom(results$);

    var body = [['Account Name', 'Account Number', 'Bank Name']];

    for (let data of accountsGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.account_name);
      row.push(rowData.account_number);
      row.push(rowData.bank_name);
      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['45%', '25%', '30%'],
          body: body
        }
      }
    ]

    var header = 'netRink Personal - All Accounts';
    this.pdfPrint.openPdf(header, content);
  }

  // view account

  async printViewAccount(){
    const accountFormResults$ = this.accountsApi.getAccount();
    const transactionsGridResults$ = this.accountsApi.getAccountTransactions();
    const accountFormData: any = await lastValueFrom(accountFormResults$);
    const transactionsGridData: any = await lastValueFrom(transactionsGridResults$);
    
    // account

    var accountBody = [
      ['Account Name', ':', accountFormData.account_name],
      ['Account No', ':', accountFormData.account_number],
      ['Bank Name', ':', accountFormData.bank_name],
      ['Account Type', ':', accountFormData.account_type],
    ]

    // transaction

    var tranctionBody = [['Transaction Date', 'Description', 'Transaction Type', 'Amount']];

    for (let data of transactionsGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.transaction_date);
      row.push(rowData.description);
      row.push(rowData.transaction_type);
      row.push(rowData.amount);
      tranctionBody.push(row);
    }

    let balance = 0;
    for (let item of transactionsGridData){
      let rowData: any = item;
      if (rowData.transaction_type == "Credit")
        balance += +rowData.amount
      else
        balance -= +rowData.amount
    }
    tranctionBody.push(['', '', '', balance.toString()]);

    let content = [
      {
        columns: [
          [
            {
              layout: 'noBorders',
              table: {
                headerRows: 0,
                widths: ['33%', '2%', '65%'],
                body: accountBody
              }
            }
          ],
          [
            { text: 'Account Balance', bold: true, alignment: 'center' },
            { text: '$' + balance, bold: true, alignment: 'center' }
          ]
        ]
      },
      { text: 'Transactions', bold: true, margin: [0, 20, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['25%', '35%', '20%', '20%'],
          body: tranctionBody
        }
      }
    ]

    var header = 'netRink Personal - View Account';
    this.pdfPrint.openPdf(header, content);
  }

  // all transaction

  async printAllTransactions(){
    const results$ = this.accountsApi.getUserTransactions(1, 100, "");
    const transactionsGridData: any = await lastValueFrom(results$);

    var body = [['Transaction Date', 'Account Name', 'Bank Name', 'Description', 'Transaction Type', 'Amount']];

    for (let data of transactionsGridData.results){
      var row = [];
      let rowData: any = data;
      row.push(rowData.transaction_date);
      row.push(rowData.account.account_name);
      row.push(rowData.account.bank_name);
      row.push(rowData.description);
      row.push(rowData.transaction_type);
      row.push(rowData.amount);

      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '20%', '18%', '23%', '12%', '12%'],
          body: body
        }
      }
    ]

    var header = 'netRink Personal - All Transactions';
    this.pdfPrint.openPdf('', content);
  }

}
