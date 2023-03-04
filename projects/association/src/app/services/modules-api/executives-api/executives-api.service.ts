import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/association/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class ExecutivesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  executivesUrl = environment.apiUrl + 'association-modules/executives/';

  // executives

  public getAccountExecutive(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.executivesUrl + "executive?account=" + this.customCookie.getCookie('association_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postExecutive(executive: any): Observable<any>{
    return this.http.post(this.executivesUrl + "executive/", executive, this.authHeaders.headers);
  }

  public getExecutive(): Observable<any>{
    return this.http.get(this.executivesUrl + "executive/" + sessionStorage.getItem('association_executive_id'), this.authHeaders.headers);
  }

  public putExecutive(executive: any): Observable<any>{
    return this.http.put(this.executivesUrl + "executive/" + sessionStorage.getItem('association_executive_id'), executive, this.authHeaders.headers);
  }

  public deleteExecutive(): Observable<any>{
    return this.http.delete(this.executivesUrl + "executive/" + sessionStorage.getItem('association_executive_id'), this.authHeaders.headers);
  }

  // config

  public getExecutiveCodeConfig(): Observable<any>{
    return this.http.get(this.executivesUrl + "config/executive-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  public putExecutiveCodeConfig(executive: any): Observable<any>{
    return this.http.put(this.executivesUrl + "config/executive-code/" + this.customCookie.getCookie('association_id'), executive, this.authHeaders.headers);
  }

  public getNewExecutiveCodeConfig(): Observable<any>{
    return this.http.get(this.executivesUrl + "config/new-executive-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }
  
  // dashboard

  public getExecutiveCount(): Observable<any>{
    return this.http.get(this.executivesUrl + "dashboard/executive-count?account=" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

}
