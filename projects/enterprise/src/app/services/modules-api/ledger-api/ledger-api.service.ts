import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class LedgerApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  ledgerUrl = environment.apiUrl + 'enterprise-modules/ledger/';

  // ledger

  public getAccountLedger(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.ledgerUrl + "ledger?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getLedger(): Observable<any>{
    return this.http.get(this.ledgerUrl + "ledger/" + sessionStorage.getItem('enterprise_ledger_id'), this.authHeaders.headers);
  }

  public postLedger(ledger: any): Observable<any>{
    return this.http.post(this.ledgerUrl + "ledger/", ledger, this.authHeaders.headers);
  }

  public putLedger(ledger: any): Observable<any>{
    return this.http.put(this.ledgerUrl + "ledger/" + sessionStorage.getItem('enterprise_ledger_id'), ledger, this.authHeaders.headers);
  }

  public deleteLedger(): Observable<any>{
    return this.http.delete(this.ledgerUrl + "ledger/" + sessionStorage.getItem('enterprise_ledger_id'), this.authHeaders.headers);
  }

  // ledgerItems

  public getAllLedgerLedgerItem(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.ledgerUrl + "all-ledgerItem?ledger=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getLedgerLedgerItem(): Observable<any>{
    return this.http.get(this.ledgerUrl + "ledger-item?ledger=" + sessionStorage.getItem('enterprise_ledger_id'), this.authHeaders.headers);
  }

  public getLedgerItem(ledgerItemId: any): Observable<any>{
    return this.http.get(this.ledgerUrl + "ledger-item/=" + ledgerItemId, this.authHeaders.headers);
  }

  public postLedgerItem(ledgerItem: any): Observable<any>{
    return this.http.post(this.ledgerUrl + "ledger-item/", ledgerItem, this.authHeaders.headers);
  }

  public putLedgerItem(ledgerItem: any, ledgerItemId: any): Observable<any>{
    return this.http.put(this.ledgerUrl + "ledger-item/" + ledgerItemId, ledgerItem, this.authHeaders.headers);
  }

  public deleteLedgerItem(ledgerItemId: any): Observable<any>{
    return this.http.delete(this.ledgerUrl + "ledger-item/" + ledgerItemId, this.authHeaders.headers);
  }
  
  // config

  public getLedgerCodeConfig(): Observable<any>{
    return this.http.get(this.ledgerUrl + "config/ledger-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

  public putLedgerCodeConfig(ledger: any): Observable<any>{
    return this.http.put(this.ledgerUrl + "config/ledger-code/" + this.customCookie.getCookie('enterprise_id'), ledger, this.authHeaders.headers);
  }

  public getNewLedgerCodeConfig(): Observable<any>{
    return this.http.get(this.ledgerUrl + "config/new-ledger-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }
  
}
