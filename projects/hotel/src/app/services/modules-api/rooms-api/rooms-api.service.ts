import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class RoomsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  roomsUrl = environment.apiUrl + 'hotel-modules/rooms/';

  // create and get all room belonging to user

  public getAccountRoom(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.roomsUrl + "room?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&rooming=" + sortField, this.authHeaders.headers);
  }

  public postRoom(room: any): Observable<any>{
    return this.http.post(this.roomsUrl + "room/", room, this.authHeaders.headers);
  }

  public getRoom(): Observable<any>{
    return this.http.get(this.roomsUrl + "room/" + sessionStorage.getItem('hotel_room_id'), this.authHeaders.headers);
  }

  public putRoom(room: any): Observable<any>{
    return this.http.put(this.roomsUrl + "room/" + sessionStorage.getItem('hotel_room_id'), room, this.authHeaders.headers);
  }

  public deleteRoom(): Observable<any>{
    return this.http.delete(this.roomsUrl + "room/" + sessionStorage.getItem('hotel_room_id'), this.authHeaders.headers);
  }

}
