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
export class ReportsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  reportsUrl = environment.apiUrl + 'school-modules/reports/';

  // reports

  // create and get all report belonging to user

  public getAccountReport(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.reportsUrl + "report?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&reporting=" + sortField, this.authHeaders.headers);
  }

  public postReport(report: any): Observable<any>{
    return this.http.post(this.reportsUrl + "report/", report, this.authHeaders.headers);
  }

  public getReport(): Observable<any>{
    return this.http.get(this.reportsUrl + "report/" + sessionStorage.getItem('school_report_id'), this.authHeaders.headers);
  }

  public putReport(report: any): Observable<any>{
    return this.http.put(this.reportsUrl + "report/" + sessionStorage.getItem('school_report_id'), report, this.authHeaders.headers);
  }

  public deleteReport(): Observable<any>{
    return this.http.delete(this.reportsUrl + "report/" + sessionStorage.getItem('school_report_id'), this.authHeaders.headers);
  }

  // report assessments

  public getReportAssessment(): Observable<any>{
    return this.http.get(this.reportsUrl + "report-assessment?report=" + sessionStorage.getItem('school_report_id'));
  }

  public postReportAssessment(reportAssessment: any): Observable<any>{
    return this.http.post(this.reportsUrl + "report-assessment/", reportAssessment, this.authHeaders.headers);
  }

  public deleteReportAssessment(reportId: any): Observable<any>{
    return this.http.delete(this.reportsUrl + "report_assessment/" + reportId, this.authHeaders.headers);
  }

  // report sheet


  
  // config

  public getReportCodeConfig(): Observable<any>{
    return this.http.get(this.reportsUrl + "config/report-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putReportCodeConfig(report: any): Observable<any>{
    return this.http.put(this.reportsUrl + "config/report-code/" + this.customCookie.getCookie('school_id'), report, this.authHeaders.headers);
  }

  public getNewReportCodeConfig(): Observable<any>{
    return this.http.get(this.reportsUrl + "config/new-report-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }
  
}
