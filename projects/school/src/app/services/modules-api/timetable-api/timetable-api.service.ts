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
export class TimetableApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  timetableUrl = environment.apiUrl + 'school-modules/timetable/';

  // timetables

  public getAccountTimetable(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.timetableUrl + "timetable?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postTimetable(timetable: any): Observable<any>{
    return this.http.post(this.timetableUrl + "timetable/", timetable, this.authHeaders.headers);
  }

  public getTimetable(): Observable<any>{
    return this.http.get(this.timetableUrl + "timetable/" + sessionStorage.getItem('school_timetable_id'), this.authHeaders.headers);
  }

  public putTimetable(timetable: any): Observable<any>{
    return this.http.put(this.timetableUrl + "timetable/" + sessionStorage.getItem('school_timetable_id'), timetable, this.authHeaders.headers);
  }

  public deleteTimetable(): Observable<any>{
    return this.http.delete(this.timetableUrl + "timetable/" + sessionStorage.getItem('school_timetable_id'), this.authHeaders.headers);
  }

  // sheet

  // TODO:

  // config

  public getTimetableCodeConfig(): Observable<any>{
    return this.http.get(this.timetableUrl + "config/timetable-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putTimetableCodeConfig(timetable: any): Observable<any>{
    return this.http.put(this.timetableUrl + "config/timetable-code/" + this.customCookie.getCookie('school_id'), timetable, this.authHeaders.headers);
  }

  public getNewTimetableCodeConfig(): Observable<any>{
    return this.http.get(this.timetableUrl + "config/new-timetable-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard
  
}
