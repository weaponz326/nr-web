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

  restaurantApi = environment.restaurantApi;
  personalApi = environment.personalApi;

  // extended profile

  public getExtendedProfile(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-settings/extended-profile/" + localStorage.getItem('restaurant_id'));
  }

  public putExtendedProfile(extended: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-settings/extended-profile/" + localStorage.getItem('restaurant_id'), extended);
  }

  public patchExtendedProfile(extended: any): Observable<any>{
    return this.http.patch(this.restaurantApi + "module-settings/extended-profile/" + localStorage.getItem('restaurant_id'), extended);
  }

  // subscriptions

  public getSubscription(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-settings/subscription/" + localStorage.getItem('restaurant_id'));
  }

  public putSubscription(subscription: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-settings/subscription/" + localStorage.getItem('restaurant_id'), subscription);
  }

  public patchSubscription(subscription: any): Observable<any>{
    return this.http.patch(this.restaurantApi + "module-settings/subscription/" + localStorage.getItem('restaurant_id'), subscription);
  }

}
