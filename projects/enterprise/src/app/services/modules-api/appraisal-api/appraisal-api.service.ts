import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/enterprise/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AppraisalApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  appraisalUrl = environment.apiUrl + 'enterprise-modules/appraisal/';

  // appraisal

  public getAccountAppraisal(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.appraisalUrl + "appraisal?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postAppraisal(appraisal: any): Observable<any>{
    return this.http.post(this.appraisalUrl + "appraisal/", appraisal, this.authHeaders.headers);
  }

  public getAppraisal(): Observable<any>{
    return this.http.get(this.appraisalUrl + "appraisal/" + sessionStorage.getItem('enterprise_appraisal_id'), this.authHeaders.headers);
  }

  public putAppraisal(appraisal: any): Observable<any>{
    return this.http.put(this.appraisalUrl + "appraisal/" + sessionStorage.getItem('enterprise_appraisal_id'), appraisal, this.authHeaders.headers);
  }

  public deleteAppraisal(): Observable<any>{
    return this.http.delete(this.appraisalUrl + "appraisal/" + sessionStorage.getItem('enterprise_appraisal_id'), this.authHeaders.headers);
  }

  // sheet

  public postAppraisalSheet(appraisalSheet: any): Observable<any>{
    return this.http.post(this.appraisalUrl + "appraisal-sheet/", appraisalSheet, this.authHeaders.headers);
  }

  public getAppraisalSheet(): Observable<any>{
    return this.http.get(this.appraisalUrl + "appraisal-sheet/" + sessionStorage.getItem('enterprise_appraisal_id'), this.authHeaders.headers);
  }

  public putAppraisalSheet(appraisalSheet: any): Observable<any>{
    return this.http.put(this.appraisalUrl + "appraisal-sheet/" + sessionStorage.getItem('enterprise_appraisal_id'), appraisalSheet, this.authHeaders.headers);
  }

  public deleteAppraisalSheet(): Observable<any>{
    return this.http.delete(this.appraisalUrl + "appraisal-sheet/" + sessionStorage.getItem('enterprise_appraisal_id'), this.authHeaders.headers);
  }

  // config

  public getAppraisalCodeConfig(): Observable<any>{
    return this.http.get(this.appraisalUrl + "config/appraisal-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

  public putAppraisalCodeConfig(appraisal: any): Observable<any>{
    return this.http.put(this.appraisalUrl + "config/appraisal-code/" + this.customCookie.getCookie('enterprise_id'), appraisal, this.authHeaders.headers);
  }

  public getNewAppraisalCodeConfig(): Observable<any>{
    return this.http.get(this.appraisalUrl + "config/new-appraisal-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

}
