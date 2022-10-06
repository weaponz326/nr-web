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

  settingsUrl = environment.apiUrl + 'restaurant-modules/settings/';

  // extended profile

  public getExtendedProfile(): Observable<any>{
    return this.http.get(this.settingsUrl + "extended-profile/" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public putExtendedProfile(extended: any): Observable<any>{
    return this.http.put(this.settingsUrl + "extended-profile/" + localStorage.getItem('restaurant_id'), extended, this.authHeaders.headers);
  }

  public patchExtendedProfile(extended: any): Observable<any>{
    return this.http.patch(this.settingsUrl + "extended-profile/" + localStorage.getItem('restaurant_id'), extended, this.authHeaders.headers);
  }

  // subscriptions

  public getSubscription(): Observable<any>{
    return this.http.get(this.settingsUrl + "subscription/" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public putSubscription(subscription: any): Observable<any>{
    return this.http.put(this.settingsUrl + "subscription/" + localStorage.getItem('restaurant_id'), subscription, this.authHeaders.headers);
  }

  public changeSubscription(subscription: any): Observable<any>{
    return this.http.put(this.settingsUrl + "subscription-change/" + localStorage.getItem('restaurant_id'), subscription, this.authHeaders.headers);
  }

  // subscription events

  public getAccountSubscriptionEvent(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.settingsUrl + "roster?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

}
