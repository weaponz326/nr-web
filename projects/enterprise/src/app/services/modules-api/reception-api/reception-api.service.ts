import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/enterprise/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class ReceptionApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  receptionUrl = environment.apiUrl + 'enterprise-modules/reception/';

  // visitor

  public getAccountVisitor(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.receptionUrl + "visitor?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postVisitor(visitor: any): Observable<any>{
    return this.http.post(this.receptionUrl + "visitor/", visitor, this.authHeaders.headers);
  }

  public getVisitor(): Observable<any>{
    return this.http.get(this.receptionUrl + "visitor/" + sessionStorage.getItem('enterprise_visitor_id'), this.authHeaders.headers);
  }

  public putVisitor(visitorId: any, visitorData: any): Observable<any>{
    return this.http.put(this.receptionUrl + "visitor/" + visitorId, visitorData, this.authHeaders.headers);
  }

  public deleteVisitor(visitorId: any): Observable<any>{
    return this.http.delete(this.receptionUrl + "visitor/" + visitorId, this.authHeaders.headers);
  }
  
  // config

  public getVisitCodeConfig(): Observable<any>{
    return this.http.get(this.receptionUrl + "config/visit-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

  public putVisitCodeConfig(visit: any): Observable<any>{
    return this.http.put(this.receptionUrl + "config/visit-code/" + this.customCookie.getCookie('enterprise_id'), visit, this.authHeaders.headers);
  }

  public getNewVisitCodeConfig(): Observable<any>{
    return this.http.get(this.receptionUrl + "config/new-visit-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }
  
}
