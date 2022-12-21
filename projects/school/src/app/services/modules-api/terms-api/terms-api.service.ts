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
export class TermsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  termsUrl = environment.apiUrl + 'school-modules/terms/';

  // terms

  public getAccountTerm(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.termsUrl + "term?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&orderinging=" + sortField, this.authHeaders.headers);
  }

  public postTerm(term: any): Observable<any>{
    return this.http.post(this.termsUrl + "term/", term, this.authHeaders.headers);
  }

  public getTerm(): Observable<any>{
    return this.http.get(this.termsUrl + "term/" + sessionStorage.getItem('school_term_id'), this.authHeaders.headers);
  }

  public putTerm(term: any): Observable<any>{
    return this.http.put(this.termsUrl + "term/" + sessionStorage.getItem('school_term_id'), term, this.authHeaders.headers);
  }

  public deleteTerm(): Observable<any>{
    return this.http.delete(this.termsUrl + "term/" + sessionStorage.getItem('school_term_id'), this.authHeaders.headers);
  }

  // active term

  public postActiveTerm(term: any): Observable<any>{
    return this.http.post(this.termsUrl + "active-term/", term, this.authHeaders.headers);
  }

  public getActiveTerm(): Observable<any>{
    return this.http.get(this.termsUrl + "active-term/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putActiveTerm(term: any): Observable<any>{
    return this.http.put(this.termsUrl + "active-term/" + this.customCookie.getCookie('school_id'), term, this.authHeaders.headers);
  }

  // config

  public getTermCodeConfig(): Observable<any>{
    return this.http.get(this.termsUrl + "config/term-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putTermCodeConfig(term: any): Observable<any>{
    return this.http.put(this.termsUrl + "config/term-code/" + this.customCookie.getCookie('school_id'), term, this.authHeaders.headers);
  }

  public getNewTermCodeConfig(): Observable<any>{
    return this.http.get(this.termsUrl + "config/new-term-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard
  
}
