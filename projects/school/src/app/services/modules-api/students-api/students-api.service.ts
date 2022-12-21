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
export class StudentsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  studentsUrl = environment.apiUrl + 'school-modules/students/';

  // students

  // create and get all student belonging to user

  public getAccountStudent(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.studentsUrl + "student?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&studenting=" + sortField, this.authHeaders.headers);
  }

  public postStudent(student: any): Observable<any>{
    return this.http.post(this.studentsUrl + "student/", student, this.authHeaders.headers);
  }

  public getStudent(): Observable<any>{
    return this.http.get(this.studentsUrl + "student/" + sessionStorage.getItem('school_student_id'), this.authHeaders.headers);
  }

  public putStudent(student: any): Observable<any>{
    return this.http.put(this.studentsUrl + "student/" + sessionStorage.getItem('school_student_id'), student, this.authHeaders.headers);
  }

  public deleteStudent(): Observable<any>{
    return this.http.delete(this.studentsUrl + "student/" + sessionStorage.getItem('school_student_id'), this.authHeaders.headers);
  }

  public putStudentPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('school') as string);
    return this.http.put(this.studentsUrl + "student/" + sessionStorage.getItem('school_student_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getStudentCodeConfig(): Observable<any>{
    return this.http.get(this.studentsUrl + "config/student-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putStudentCodeConfig(student: any): Observable<any>{
    return this.http.put(this.studentsUrl + "config/student-code/" + this.customCookie.getCookie('school_id'), student, this.authHeaders.headers);
  }

  public getNewStudentCodeConfig(): Observable<any>{
    return this.http.get(this.studentsUrl + "config/new-student-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

}
