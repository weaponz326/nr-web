import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hospital/src/environments/environment'

import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  appointmentsUrl = environment.apiUrl + 'hospital-modules/appointments/';

  public getAccountAppointment(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.appointmentsUrl + "appointment?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postAppointment(appointment: any): Observable<any>{
    return this.http.post(this.appointmentsUrl + "appointment/", appointment, this.authHeaders.headers);
  }

  public getAppointment(id: any): Observable<any>{
    return this.http.get(this.appointmentsUrl + "appointment/" + id, this.authHeaders.headers);
  }

  public putAppointment(id: any, data: any): Observable<any>{
    return this.http.put(this.appointmentsUrl + "appointment/" + id, data, this.authHeaders.headers);
  }

  public deleteAppointment(id: any): Observable<any>{
    return this.http.delete(this.appointmentsUrl + "appointment/" + id, this.authHeaders.headers);
  }

  // dashboard

  public getAppointmentCount(): Observable<any>{
    return this.http.get(this.appointmentsUrl + "dashboard/appointment-count?account=" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}
