import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/enterprise/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class FiscalYearApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  fiscalYearUrl = environment.apiUrl + 'enterprise-modules/fiscal-year/';

  // fiscal year

  public getAccountFiscalYear(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.fiscalYearUrl + "fiscal-year?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postFiscalYear(fiscalYear: any): Observable<any>{
    return this.http.post(this.fiscalYearUrl + "fiscal-year/", fiscalYear, this.authHeaders.headers);
  }

  public getFiscalYear(): Observable<any>{
    return this.http.get(this.fiscalYearUrl + "fiscal-year/" + sessionStorage.getItem('enterprise_fiscal_year_id'), this.authHeaders.headers);
  }

  public putFiscalYear(fiscalYear: any): Observable<any>{
    return this.http.put(this.fiscalYearUrl + "fiscal-year/" + sessionStorage.getItem('enterprise_fiscal_year_id'), fiscalYear, this.authHeaders.headers);
  }

  public deleteFiscalYear(): Observable<any>{
    return this.http.delete(this.fiscalYearUrl + "fiscal-year/" + sessionStorage.getItem('enterprise_fiscal_year_id'), this.authHeaders.headers);
  }

}
