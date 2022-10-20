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
export class LessonPlanApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  lessonPlanUrl = environment.apiUrl + 'school-modules/lesson-plan/';

  // lesson plan

  public getAccountLessonPlan(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.lessonPlanUrl + "lesson-plan?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postLessonPlan(lessonplan: any): Observable<any>{
    return this.http.post(this.lessonPlanUrl + "lesson-plan/", lessonplan, this.authHeaders.headers);
  }

  public getLessonPlan(): Observable<any>{
    return this.http.get(this.lessonPlanUrl + "lesson-plan/" + sessionStorage.getItem('school_lesson_plan_id'), this.authHeaders.headers);
  }

  public putLessonPlan(lessonplan: any): Observable<any>{
    return this.http.put(this.lessonPlanUrl + "lesson-plan/" + sessionStorage.getItem('school_lesson_plan_id'), lessonplan, this.authHeaders.headers);
  }

  public deleteLessonPlan(): Observable<any>{
    return this.http.delete(this.lessonPlanUrl + "lesson-plan/" + sessionStorage.getItem('school_lesson_plan_id'), this.authHeaders.headers);
  }

  // config

  public getLessonPlanCodeConfig(): Observable<any>{
    return this.http.get(this.lessonPlanUrl + "config/lesson-plan-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putLessonPlanCodeConfig(lessonplan: any): Observable<any>{
    return this.http.put(this.lessonPlanUrl + "config/lesson-plan-code/" + this.customCookie.getCookie('school_id'), lessonplan, this.authHeaders.headers);
  }

  public getNewLessonPlanCodeConfig(): Observable<any>{
    return this.http.get(this.lessonPlanUrl + "config/new-lesson-plan-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

}
