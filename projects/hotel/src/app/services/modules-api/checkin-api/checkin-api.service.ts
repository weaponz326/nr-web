import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class CheckinApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  checkinUrl = environment.apiUrl + 'hotel-modules/checkin/';

  // create and get all checkin belonging to user

  public getAccountCheckin(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.checkinUrl + "checkin?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&checkining=" + sortField, this.authHeaders.headers);
  }

  public postCheckin(checkin: any): Observable<any>{
    return this.http.post(this.checkinUrl + "checkin/", checkin, this.authHeaders.headers);
  }

  public getCheckin(): Observable<any>{
    return this.http.get(this.checkinUrl + "checkin/" + sessionStorage.getItem('hotel_checkin_id'), this.authHeaders.headers);
  }

  public putCheckin(checkin: any): Observable<any>{
    return this.http.put(this.checkinUrl + "checkin/" + sessionStorage.getItem('hotel_checkin_id'), checkin, this.authHeaders.headers);
  }

  public deleteCheckin(): Observable<any>{
    return this.http.delete(this.checkinUrl + "checkin/" + sessionStorage.getItem('hotel_checkin_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.checkinUrl + "checkin/" + sessionStorage.getItem('hotel_id'), totalData, this.authHeaders.headers);
  // }

  // checkin rooms

  public getCheckinCheckinRoom(): Observable<any>{
    return this.http.get(this.checkinUrl + "checkin-room?checkin=" + sessionStorage.getItem('hotel_checkin_id'), this.authHeaders.headers);
  }

  public postCheckinRoom(item: any): Observable<any>{
    return this.http.post(this.checkinUrl + "checkin-room/", item, this.authHeaders.headers);
  }

  public getCheckinRoom(itemId: any): Observable<any>{
    return this.http.get(this.checkinUrl + "checkin-room/" + itemId, this.authHeaders.headers);
  }

  public putCheckinRoom(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.checkinUrl + "checkin-room/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteCheckinRoom(itemId: any): Observable<any>{
    return this.http.delete(this.checkinUrl + "checkin-room/" + itemId, this.authHeaders.headers);
  }

  // config

  public getCheckinCodeConfig(): Observable<any>{
    return this.http.get(this.checkinUrl + "config/checkin-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public putCheckinCodeConfig(checkin: any): Observable<any>{
    return this.http.put(this.checkinUrl + "config/checkin-code/" + this.customCookie.getCookie('hotel_id'), checkin, this.authHeaders.headers);
  }

  public getNewCheckinCodeConfig(): Observable<any>{
    return this.http.get(this.checkinUrl + "config/new-checkin-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  // dashboard

  public getCheckinCount(): Observable<any>{
    return this.http.get(this.checkinUrl + "dashboard/checkin-count?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public getCheckinAnnotate(): Observable<any>{
    return this.http.get(this.checkinUrl + "dashboard/checkin-annotate?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}
