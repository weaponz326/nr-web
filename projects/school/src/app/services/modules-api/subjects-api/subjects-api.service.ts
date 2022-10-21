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
export class SubjectsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  subjectsUrl = environment.apiUrl + 'school-modules/subjects/';

  // subjects

  // create and get all subject belonging to user

  public getAccountSubject(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.subjectsUrl + "subject?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&orderinging=" + sortField, this.authHeaders.headers);
  }

  public postSubject(subject: any): Observable<any>{
    return this.http.post(this.subjectsUrl + "subject/", subject, this.authHeaders.headers);
  }

  public getSubject(): Observable<any>{
    return this.http.get(this.subjectsUrl + "subject/" + sessionStorage.getItem('school_subject_id'), this.authHeaders.headers);
  }

  public putSubject(subject: any): Observable<any>{
    return this.http.put(this.subjectsUrl + "subject/" + sessionStorage.getItem('school_subject_id'), subject, this.authHeaders.headers);
  }

  public deleteSubject(): Observable<any>{
    return this.http.delete(this.subjectsUrl + "subject/" + sessionStorage.getItem('school_subject_id'), this.authHeaders.headers);
  }

  // subject teachers

  public getSubjectSubjectTeacher(): Observable<any>{
    return this.http.get(this.subjectsUrl + "subject-teacher?subject=" + sessionStorage.getItem('school_subject_id'), this.authHeaders.headers);
  }

  public postSubjectTeacher(teacher: any): Observable<any>{
    return this.http.post(this.subjectsUrl + "subject-teacher/", teacher, this.authHeaders.headers);
  }

  public getSubjectTeacher(teacherId: any): Observable<any>{
    return this.http.get(this.subjectsUrl + "subject-teacher/" + teacherId, this.authHeaders.headers);
  }

  public putSubjectTeacher(teacherId: any, teacherData: any): Observable<any>{
    return this.http.put(this.subjectsUrl + "subject-teacher/" + teacherId, teacherData, this.authHeaders.headers);
  }

  public deleteSubjectTeacher(teacherId: any): Observable<any>{
    return this.http.delete(this.subjectsUrl + "subject-teacher/" + teacherId, this.authHeaders.headers);
  }

  // config

  public getSubjectCodeConfig(): Observable<any>{
    return this.http.get(this.subjectsUrl + "config/subject-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putSubjectCodeConfig(subject: any): Observable<any>{
    return this.http.put(this.subjectsUrl + "config/subject-code/" + this.customCookie.getCookie('school_id'), subject, this.authHeaders.headers);
  }

  public getNewSubjectCodeConfig(): Observable<any>{
    return this.http.get(this.subjectsUrl + "config/new-subject-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard

}
