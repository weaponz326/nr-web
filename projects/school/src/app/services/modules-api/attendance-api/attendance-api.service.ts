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
export class AttendanceApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  attendanceUrl = environment.apiUrl + 'school-modules/attendance/';

  // students attendance

  public getAccountStudentAttendance(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.attendanceUrl + "student-attendance?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postStudentAttendance(attendance: any): Observable<any>{
    return this.http.post(this.attendanceUrl + "student-attendance/", attendance, this.authHeaders.headers);
  }

  public getStudentAttendance(): Observable<any>{
    return this.http.get(this.attendanceUrl + "student-attendance/" + sessionStorage.getItem('school_student_attendance_id'), this.authHeaders.headers);
  }

  public putStudentAttendance(attendance: any): Observable<any>{
    return this.http.put(this.attendanceUrl + "student-attendance/" + sessionStorage.getItem('school_student_attendance_id'), attendance, this.authHeaders.headers);
  }

  public deleteStudentAttendance(): Observable<any>{
    return this.http.delete(this.attendanceUrl + "student-attendance/" + sessionStorage.getItem('school_student_attendance_id'), this.authHeaders.headers);
  }

  // teachers attendance

  public getAccountTeacherAttendance(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.attendanceUrl + "teacher-attendance?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postTeacherAttendance(attendance: any): Observable<any>{
    return this.http.post(this.attendanceUrl + "teacher-attendance/", attendance, this.authHeaders.headers);
  }

  public getTeacherAttendance(): Observable<any>{
    return this.http.get(this.attendanceUrl + "teacher-attendance/" + sessionStorage.getItem('school_teacher_attendance_id'), this.authHeaders.headers);
  }

  public putTeacherAttendance(attendance: any): Observable<any>{
    return this.http.put(this.attendanceUrl + "teacher-attendance/" + sessionStorage.getItem('school_teacher_attendance_id'), attendance, this.authHeaders.headers);
  }

  public deleteTeacherAttendance(): Observable<any>{
    return this.http.delete(this.attendanceUrl + "teacher-attendance/" + sessionStorage.getItem('school_teacher_attendance_id'), this.authHeaders.headers);
  }

  // attendance sheet


  // config

  public getAttendanceCodeConfig(): Observable<any>{
    return this.http.get(this.attendanceUrl + "config/attendance-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putAttendanceCodeConfig(attendance: any): Observable<any>{
    return this.http.put(this.attendanceUrl + "config/attendance-code/" + this.customCookie.getCookie('school_id'), attendance, this.authHeaders.headers);
  }

  public getNewAttendanceCodeConfig(): Observable<any>{
    return this.http.get(this.attendanceUrl + "config/new-attendance-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

}
