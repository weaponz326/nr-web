import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class GuestsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  guestsUrl = environment.apiUrl + 'hotel-modules/guests/';

  // guests

  public getAccountGuest(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.guestsUrl + "guest?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postGuest(guest: any): Observable<any>{
    return this.http.post(this.guestsUrl + "guest/", guest, this.authHeaders.headers);
  }

  public getGuest(): Observable<any>{
    return this.http.get(this.guestsUrl + "guest/" + sessionStorage.getItem('hotel_guest_id'), this.authHeaders.headers);
  }

  public putGuest(guest: any): Observable<any>{
    return this.http.put(this.guestsUrl + "guest/" + sessionStorage.getItem('hotel_guest_id'), guest, this.authHeaders.headers);
  }

  public deleteGuest(): Observable<any>{
    return this.http.delete(this.guestsUrl + "guest/" + sessionStorage.getItem('hotel_guest_id'), this.authHeaders.headers);
  }

  // config

  public getGuestCodeConfig(): Observable<any>{
    return this.http.get(this.guestsUrl + "config/guest-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public putGuestCodeConfig(guest: any): Observable<any>{
    return this.http.put(this.guestsUrl + "config/guest-code/" + this.customCookie.getCookie('hotel_id'), guest, this.authHeaders.headers);
  }

  public getNewGuestCodeConfig(): Observable<any>{
    return this.http.get(this.guestsUrl + "config/new-guest-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }
  
  // dashboard

  public getGuestCount(): Observable<any>{
    return this.http.get(this.guestsUrl + "dashboard/guest-count?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}
