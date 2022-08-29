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
        header: 'netRink Personal - All Accounts',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['45%', '25%', '30%'],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

  // view account

  async printViewAccount(){
    const accountFormResults$ = this.accountsApi.getAccount();
    const transactionsGridResults$ = this.accountsApi.getAccountTransactions();
    // const [accountFormData, transactionsGridData] = await Promise.all([accountFormPromise, transactionsGridPromise]);
    const accountFormData: any = await lastValueFrom(accountFormResults$);
    const transactionsGridData: any = await lastValueFrom(transactionsGridResults$);
    
    var body = [['Transaction Date', 'Description', 'Transaction Type', 'Amount']];

    for (let data of transactionsGridData){
      var row = [];
      let rowData: any = data;
      row.push(rowData.transaction_date);
      row.push(rowData.description);
      row.push(rowData.transaction_type);
      row.push(rowData.amount);
      body.push(row);
    }

    let balance = 0;
    for (let item of transactionsGridData){
      let rowData: any = item;
      if (rowData.transaction_type == "Credit")
        balance += +rowData.amount
      else
        balance -= +rowData.amount
    }
    body.push(['', '', '', balance.toString()]);

    let content = [
      {
        header: 'netRink Personal - View Account',
        columns: [
          [
            { text: 'Account Name: ' + accountFormData.account_name },
            { text: 'Account No: ' + accountFormData.account_number },
            { text: 'Bank Name: ' + accountFormData.bank_name },
            { text: 'Account Type: ' + accountFormData.account_type },
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
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
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
        header: 'netRink Personal - All Transactions',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '20%', '18%', '23%', '12%', '12%'],
          body: body
        }
      }
    ]

    this.pdfPrint.openPdf(content);
  }

}
