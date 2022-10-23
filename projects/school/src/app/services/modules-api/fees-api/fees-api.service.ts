import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class FeesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  feesUrl = environment.apiUrl + 'school-modules/fees/';

  // feess

  public getAccountFees(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.feesUrl + "fees?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postFees(fees: any): Observable<any>{
    return this.http.post(this.feesUrl + "fees/", fees, this.authHeaders.headers);
  }

  public getFees(): Observable<any>{
    return this.http.get(this.feesUrl + "fees/" + sessionStorage.getItem('school_fees_id'), this.authHeaders.headers);
  }

  public putFees(fees: any): Observable<any>{
    return this.http.put(this.feesUrl + "fees/" + sessionStorage.getItem('school_fees_id'), fees, this.authHeaders.headers);
  }

  public deleteFees(): Observable<any>{
    return this.http.delete(this.feesUrl + "fees/" + sessionStorage.getItem('school_fees_id'), this.authHeaders.headers);
  }

  // feess

  public getFeesFeesTarget(): Observable<any>{
    return this.http.get(this.feesUrl + "fees-target?fees=" + sessionStorage.getItem('school_fees_id'), this.authHeaders.headers);
  }

  public postFeesTarget(fees: any): Observable<any>{
    return this.http.post(this.feesUrl + "fees-target/", fees, this.authHeaders.headers);
  }

  public deleteFeesTarget(id: any): Observable<any>{
    return this.http.delete(this.feesUrl + "fees-target/" + id, this.authHeaders.headers);
  }

  // config

  public getFeesCodeConfig(): Observable<any>{
    return this.http.get(this.feesUrl + "config/fees-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putFeesCodeConfig(fees: any): Observable<any>{
    return this.http.put(this.feesUrl + "config/fees-code/" + this.customCookie.getCookie('school_id'), fees, this.authHeaders.headers);
  }

  public getNewFeesCodeConfig(): Observable<any>{
    return this.http.get(this.feesUrl + "config/new-fees-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard

}
