import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  settingsUrl = environment.apiUrl + 'hospital-modules/settings/';

  // extended profile

  public getExtendedProfile(): Observable<any>{
    return this.http.get(this.settingsUrl + "extended-profile/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putExtendedProfile(extended: any): Observable<any>{
    return this.http.put(this.settingsUrl + "extended-profile/" + this.customCookie.getCookie('hospital_id'), extended, this.authHeaders.headers);
  }

  public patchExtendedProfile(extended: any): Observable<any>{
    return this.http.patch(this.settingsUrl + "extended-profile/" + this.customCookie.getCookie('hospital_id'), extended, this.authHeaders.headers);
  }

  // subscriptions

  public getSubscription(): Observable<any>{
    return this.http.get(this.settingsUrl + "subscription/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putSubscription(subscription: any): Observable<any>{
    return this.http.put(this.settingsUrl + "subscription/" + this.customCookie.getCookie('hospital_id'), subscription, this.authHeaders.headers);
  }

  public changeSubscription(subscription: any): Observable<any>{
    return this.http.put(this.settingsUrl + "subscription-change/" + this.customCookie.getCookie('hospital_id'), subscription, this.authHeaders.headers);
  }

  // subscription events

  public getAccountSubscriptionEvent(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.settingsUrl + "subscription-event?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

}
