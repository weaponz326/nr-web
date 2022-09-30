import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  settingsUrl = environment.apiUrl + 'school-modules/settings/';

  // extended profile

  public getExtendedProfile(): Observable<any>{
    return this.http.get(this.settingsUrl + "extended-profile/" + localStorage.getItem('school_id'), this.authHeaders.headers);
  }

  public putExtendedProfile(extended: any): Observable<any>{
    return this.http.put(this.settingsUrl + "extended-profile/" + localStorage.getItem('school_id'), extended, this.authHeaders.headers);
  }

  public patchExtendedProfile(extended: any): Observable<any>{
    return this.http.patch(this.settingsUrl + "extended-profile/" + localStorage.getItem('school_id'), extended, this.authHeaders.headers);
  }

  // subscriptions

  public getSubscription(): Observable<any>{
    return this.http.get(this.settingsUrl + "subscription/" + localStorage.getItem('school_id'), this.authHeaders.headers);
  }

  public putSubscription(subscription: any): Observable<any>{
    return this.http.put(this.settingsUrl + "subscription/" + localStorage.getItem('school_id'), subscription, this.authHeaders.headers);
  }

  public patchSubscription(subscription: any): Observable<any>{
    return this.http.patch(this.settingsUrl + "subscription/" + localStorage.getItem('school_id'), subscription, this.authHeaders.headers);
  }

}
