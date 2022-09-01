import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  personalApi = environment.personalApi;

  // accounts

  public getUserAccounts(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/account?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getAccount(): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/account/" + sessionStorage.getItem('personal_account_id'), this.authHeaders.headers);
  }

  public postAccount(account: any): Observable<any>{
    return this.http.post(this.personalApi + "module-accounts/account/", account, this.authHeaders.headers);
  }

  public putAccount(account: any): Observable<any>{
    return this.http.put(this.personalApi + "module-accounts/account/" + sessionStorage.getItem('personal_account_id'), account, this.authHeaders.headers);
  }

  public deleteAccount(): Observable<any>{
    return this.http.delete(this.personalApi + "module-accounts/account/" + sessionStorage.getItem('personal_account_id'), this.authHeaders.headers);
  }

  // transactions

  public getUserTransactions(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/all-transaction?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getAccountTransactions(): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/transaction?account=" + sessionStorage.getItem('personal_account_id'), this.authHeaders.headers);
  }

  public getTransaction(transactionId: any): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/transaction/=" + transactionId, this.authHeaders.headers);
  }

  public postTransaction(transaction: any): Observable<any>{
    return this.http.post(this.personalApi + "module-accounts/transaction/", transaction, this.authHeaders.headers);
  }

  public putTransaction(transaction: any, transactionId: any): Observable<any>{
    return this.http.put(this.personalApi + "module-accounts/transaction/" + transactionId, transaction, this.authHeaders.headers);
  }

  public deleteTransaction(transactionId: any): Observable<any>{
    return this.http.delete(this.personalApi + "module-accounts/transaction/" + transactionId, this.authHeaders.headers);
  }

  // dashboard

  public getAllAccountCount(): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/dashboard/all-account-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTransactionShare(): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/dashboard/transaction-share?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTransactionAnnotate(): Observable<any>{
    return this.http.get(this.personalApi + "module-accounts/dashboard/transaction-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

}
