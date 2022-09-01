import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  personalApi = environment.personalApi;

  // calendar

  public getUserCalendars(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/calendar?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getCalendar(): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/calendar/" + sessionStorage.getItem('personal_calendar_id'), this.authHeaders.headers);
  }

  public postCalendar(calendar: any): Observable<any>{
    return this.http.post(this.personalApi + "module-calendar/calendar/", calendar, this.authHeaders.headers);
  }

  public putCalendar(calendar: any): Observable<any>{
    return this.http.put(this.personalApi + "module-calendar/calendar/" + sessionStorage.getItem('personal_calendar_id'), calendar, this.authHeaders.headers);
  }

  public deleteCalendar(): Observable<any>{
    return this.http.delete(this.personalApi + "module-calendar/calendar/" + sessionStorage.getItem('personal_calendar_id'), this.authHeaders.headers);
  }

  // schedules

  public getUserSchedules(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/all-schedule?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getCalendarSchedules(): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/schedule?calendar=" + sessionStorage.getItem('personal_calendar_id'), this.authHeaders.headers);
  }

  public getSchedule(scheduleId: any): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/schedule/=" + scheduleId, this.authHeaders.headers);
  }

  public postSchedule(schedule: any): Observable<any>{
    return this.http.post(this.personalApi + "module-calendar/schedule/", schedule, this.authHeaders.headers);
  }

  public putSchedule(schedule: any, scheduleId: any): Observable<any>{
    return this.http.put(this.personalApi + "module-calendar/schedule/" + scheduleId, schedule, this.authHeaders.headers);
  }

  public deleteSchedule(scheduleId: any): Observable<any>{
    return this.http.delete(this.personalApi + "module-calendar/schedule/" + scheduleId, this.authHeaders.headers);
  }

  // dashboard

  public getCalendarCount(): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/dashboard/calendar-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getScheduleCount(): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/dashboard/schedule-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getCalendarAnnotate(): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/dashboard/calendar-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getScheduleAnnotate(): Observable<any>{
    return this.http.get(this.personalApi + "module-calendar/dashboard/schedule-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

}
