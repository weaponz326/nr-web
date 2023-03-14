import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/enterprise/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class LeaveApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  leaveUrl = environment.apiUrl + 'enterprise-modules/leave/';

  // leave

  public getAccountLeave(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.leaveUrl + "leave?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postLeave(leave: any): Observable<any>{
    return this.http.post(this.leaveUrl + "leave/", leave, this.authHeaders.headers);
  }

  public getLeave(): Observable<any>{
    return this.http.get(this.leaveUrl + "leave/" + sessionStorage.getItem('enterprise_leave_id'), this.authHeaders.headers);
  }

  public putLeave(leave: any): Observable<any>{
    return this.http.put(this.leaveUrl + "leave/" + sessionStorage.getItem('enterprise_leave_id'), leave, this.authHeaders.headers);
  }

  public deleteLeave(): Observable<any>{
    return this.http.delete(this.leaveUrl + "leave/" + sessionStorage.getItem('enterprise_leave_id'), this.authHeaders.headers);
  }

  // config

  public getLeaveCodeConfig(): Observable<any>{
    return this.http.get(this.leaveUrl + "config/leave-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

  public putLeaveCodeConfig(leave: any): Observable<any>{
    return this.http.put(this.leaveUrl + "config/leave-code/" + this.customCookie.getCookie('enterprise_id'), leave, this.authHeaders.headers);
  }

  public getNewLeaveCodeConfig(): Observable<any>{
    return this.http.get(this.leaveUrl + "config/new-leave-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }
  
}
