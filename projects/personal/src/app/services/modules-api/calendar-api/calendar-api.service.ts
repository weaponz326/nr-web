import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  calendarUrl = environment.apiUrl + 'personal-modules/calendar/';

  // calendar

  public getUserCalendars(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.calendarUrl + "calendar?user=" + this.customCookie.getCookie('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getCalendar(): Observable<any>{
    return this.http.get(this.calendarUrl + "calendar/" + sessionStorage.getItem('personal_calendar_id'), this.authHeaders.headers);
  }

  public postCalendar(calendar: any): Observable<any>{
    return this.http.post(this.calendarUrl + "calendar/", calendar, this.authHeaders.headers);
  }

  public putCalendar(calendar: any): Observable<any>{
    return this.http.put(this.calendarUrl + "calendar/" + sessionStorage.getItem('personal_calendar_id'), calendar, this.authHeaders.headers);
  }

  public deleteCalendar(): Observable<any>{
    return this.http.delete(this.calendarUrl + "calendar/" + sessionStorage.getItem('personal_calendar_id'), this.authHeaders.headers);
  }

  // schedules

  public getUserSchedules(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.calendarUrl + "all-schedule?user=" + this.customCookie.getCookie('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getCalendarSchedules(): Observable<any>{
    return this.http.get(this.calendarUrl + "schedule?calendar=" + sessionStorage.getItem('personal_calendar_id'), this.authHeaders.headers);
  }

  public getSchedule(scheduleId: any): Observable<any>{
    return this.http.get(this.calendarUrl + "schedule/=" + scheduleId, this.authHeaders.headers);
  }

  public postSchedule(schedule: any): Observable<any>{
    return this.http.post(this.calendarUrl + "schedule/", schedule, this.authHeaders.headers);
  }

  public putSchedule(schedule: any, scheduleId: any): Observable<any>{
    return this.http.put(this.calendarUrl + "schedule/" + scheduleId, schedule, this.authHeaders.headers);
  }

  public deleteSchedule(scheduleId: any): Observable<any>{
    return this.http.delete(this.calendarUrl + "schedule/" + scheduleId, this.authHeaders.headers);
  }

  // dashboard

  public getCalendarCount(): Observable<any>{
    return this.http.get(this.calendarUrl + "dashboard/calendar-count?user=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public getScheduleCount(): Observable<any>{
    return this.http.get(this.calendarUrl + "dashboard/schedule-count?user=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public getCalendarAnnotate(): Observable<any>{
    return this.http.get(this.calendarUrl + "dashboard/calendar-annotate?user=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public getScheduleAnnotate(): Observable<any>{
    return this.http.get(this.calendarUrl + "dashboard/schedule-annotate?user=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

}
