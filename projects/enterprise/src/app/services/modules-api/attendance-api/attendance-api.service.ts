import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/enterprise/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AttendanceApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  attendanceUrl = environment.apiUrl + 'enterprise-modules/attendance/';

  // attendance

  public getAccountAttendance(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.attendanceUrl + "attendance?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postAttendance(attendance: any): Observable<any>{
    return this.http.post(this.attendanceUrl + "attendance/", attendance, this.authHeaders.headers);
  }

  public getAttendance(): Observable<any>{
    return this.http.get(this.attendanceUrl + "attendance/" + sessionStorage.getItem('enterprise_attendance_id'), this.authHeaders.headers);
  }

  public putAttendance(attendance: any): Observable<any>{
    return this.http.put(this.attendanceUrl + "attendance/" + sessionStorage.getItem('enterprise_attendance_id'), attendance, this.authHeaders.headers);
  }

  public deleteAttendance(): Observable<any>{
    return this.http.delete(this.attendanceUrl + "attendance/" + sessionStorage.getItem('enterprise_attendance_id'), this.authHeaders.headers);
  }

  // config

  public getAttendanceCodeConfig(): Observable<any>{
    return this.http.get(this.attendanceUrl + "config/attendance-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

  public putAttendanceCodeConfig(attendance: any): Observable<any>{
    return this.http.put(this.attendanceUrl + "config/attendance-code/" + this.customCookie.getCookie('enterprise_id'), attendance, this.authHeaders.headers);
  }

  public getNewAttendanceCodeConfig(): Observable<any>{
    return this.http.get(this.attendanceUrl + "config/new-attendance-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

}
