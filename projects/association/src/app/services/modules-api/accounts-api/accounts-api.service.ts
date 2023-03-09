import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AccountsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  accountsUrl = environment.apiUrl + 'association-modules/accounts/';

  // accounts

  public getAccountAccounts(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.accountsUrl + "account?account=" + this.customCookie.getCookie('association_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getAccount(): Observable<any>{
    return this.http.get(this.accountsUrl + "account/" + sessionStorage.getItem('association_account_id'), this.authHeaders.headers);
  }

  public postAccount(account: any): Observable<any>{
    return this.http.post(this.accountsUrl + "account/", account, this.authHeaders.headers);
  }

  public putAccount(account: any): Observable<any>{
    return this.http.put(this.accountsUrl + "account/" + sessionStorage.getItem('association_account_id'), account, this.authHeaders.headers);
  }

  public deleteAccount(): Observable<any>{
    return this.http.delete(this.accountsUrl + "account/" + sessionStorage.getItem('association_account_id'), this.authHeaders.headers);
  }

  // transactions

  public getAllAccountTransactions(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.accountsUrl + "all-transaction?account=" + this.customCookie.getCookie('association_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getAccountTransactions(): Observable<any>{
    return this.http.get(this.accountsUrl + "transaction?account=" + sessionStorage.getItem('association_account_id'), this.authHeaders.headers);
  }

  public getTransaction(transactionId: any): Observable<any>{
    return this.http.get(this.accountsUrl + "transaction/=" + transactionId, this.authHeaders.headers);
  }

  public postTransaction(transaction: any): Observable<any>{
    return this.http.post(this.accountsUrl + "transaction/", transaction, this.authHeaders.headers);
  }

  public putTransaction(transaction: any, transactionId: any): Observable<any>{
    return this.http.put(this.accountsUrl + "transaction/" + transactionId, transaction, this.authHeaders.headers);
  }

  public deleteTransaction(transactionId: any): Observable<any>{
    return this.http.delete(this.accountsUrl + "transaction/" + transactionId, this.authHeaders.headers);
  }

  // dashboard

  public getAllAccountCount(): Observable<any>{
    return this.http.get(this.accountsUrl + "dashboard/all-account-count?account=" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  public getTransactionShare(): Observable<any>{
    return this.http.get(this.accountsUrl + "dashboard/transaction-share?account=" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  public getTransactionAnnotate(): Observable<any>{
    return this.http.get(this.accountsUrl + "dashboard/transaction-annotate?account=" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  // config

  public getAccountCodeConfig(): Observable<any>{
    return this.http.get(this.accountsUrl + "config/account-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public putAccountCodeConfig(account: any): Observable<any>{
    return this.http.put(this.accountsUrl + "config/account-code/" + this.customCookie.getCookie('restaurant_id'), account, this.authHeaders.headers);
  }

  public getNewAccountCodeConfig(): Observable<any>{
    return this.http.get(this.accountsUrl + "config/new-account-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

}
