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
export class AssessmentApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  assessmentUrl = environment.apiUrl + 'school-modules/assessment/';

  // assessment

  public getAccountAssessment(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.assessmentUrl + "assessment?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postAssessment(assessment: any): Observable<any>{
    return this.http.post(this.assessmentUrl + "assessment/", assessment, this.authHeaders.headers);
  }

  public getAssessment(): Observable<any>{
    return this.http.get(this.assessmentUrl + "assessment/" + sessionStorage.getItem('school_assessment_id'), this.authHeaders.headers);
  }

  public putAssessment(assessment: any): Observable<any>{
    return this.http.put(this.assessmentUrl + "assessment/" + sessionStorage.getItem('school_assessment_id'), assessment, this.authHeaders.headers);
  }

  public deleteAssessment(): Observable<any>{
    return this.http.delete(this.assessmentUrl + "assessment/" + sessionStorage.getItem('school_assessment_id'), this.authHeaders.headers);
  }
  
  // assessment sheet



  // config

  public getAssessmentCodeConfig(): Observable<any>{
    return this.http.get(this.assessmentUrl + "config/assessment-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putAssessmentCodeConfig(assessment: any): Observable<any>{
    return this.http.put(this.assessmentUrl + "config/assessment-code/" + this.customCookie.getCookie('school_id'), assessment, this.authHeaders.headers);
  }

  public getNewAssessmentCodeConfig(): Observable<any>{
    return this.http.get(this.assessmentUrl + "config/new-assessment-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard

}
