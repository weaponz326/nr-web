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
export class TeachersApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  teachersUrl = environment.apiUrl + 'school-modules/teachers/';

  // teachers

  // create and get all teacher belonging to user

  public getAccountTeacher(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.teachersUrl + "teacher?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&teachering=" + sortField, this.authHeaders.headers);
  }

  public postTeacher(teacher: any): Observable<any>{
    return this.http.post(this.teachersUrl + "teacher/", teacher, this.authHeaders.headers);
  }

  public getTeacher(): Observable<any>{
    return this.http.get(this.teachersUrl + "teacher/" + sessionStorage.getItem('school_teacher_id'), this.authHeaders.headers);
  }

  public putTeacher(teacher: any): Observable<any>{
    return this.http.put(this.teachersUrl + "teacher/" + sessionStorage.getItem('school_teacher_id'), teacher, this.authHeaders.headers);
  }

  public deleteTeacher(): Observable<any>{
    return this.http.delete(this.teachersUrl + "teacher/" + sessionStorage.getItem('school_teacher_id'), this.authHeaders.headers);
  }

  public putTeacherPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('school') as string);
    return this.http.put(this.teachersUrl + "teacher/" + sessionStorage.getItem('school_teacher_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getTeacherCodeConfig(): Observable<any>{
    return this.http.get(this.teachersUrl + "config/teacher-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putTeacherCodeConfig(teacher: any): Observable<any>{
    return this.http.put(this.teachersUrl + "config/teacher-code/" + this.customCookie.getCookie('school_id'), teacher, this.authHeaders.headers);
  }

  public getNewTeacherCodeConfig(): Observable<any>{
    return this.http.get(this.teachersUrl + "config/new-teacher-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

}
