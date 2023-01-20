import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class BookingsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  bookingsUrl = environment.apiUrl + 'hotel-modules/bookings/';

  // create and get all booking belonging to user

  public getAccountBooking(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.bookingsUrl + "booking?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&bookinging=" + sortField, this.authHeaders.headers);
  }

  public postBooking(booking: any): Observable<any>{
    return this.http.post(this.bookingsUrl + "booking/", booking, this.authHeaders.headers);
  }

  public getBooking(): Observable<any>{
    return this.http.get(this.bookingsUrl + "booking/" + sessionStorage.getItem('hotel_booking_id'), this.authHeaders.headers);
  }

  public putBooking(booking: any): Observable<any>{
    return this.http.put(this.bookingsUrl + "booking/" + sessionStorage.getItem('hotel_booking_id'), booking, this.authHeaders.headers);
  }

  public deleteBooking(): Observable<any>{
    return this.http.delete(this.bookingsUrl + "booking/" + sessionStorage.getItem('hotel_booking_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.bookingsUrl + "booking/" + sessionStorage.getItem('hotel_id'), totalData, this.authHeaders.headers);
  // }

  // booking items

  public getBookingBookedRoom(): Observable<any>{
    return this.http.get(this.bookingsUrl + "booked-room?booking=" + sessionStorage.getItem('hotel_booking_id'), this.authHeaders.headers);
  }

  public postBookedRoom(item: any): Observable<any>{
    return this.http.post(this.bookingsUrl + "booked-room/", item, this.authHeaders.headers);
  }

  public getBookedRoom(itemId: any): Observable<any>{
    return this.http.get(this.bookingsUrl + "booked-room/" + itemId, this.authHeaders.headers);
  }

  public putBookedRoom(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.bookingsUrl + "booked-room/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteBookedRoom(itemId: any): Observable<any>{
    return this.http.delete(this.bookingsUrl + "booked-room/" + itemId, this.authHeaders.headers);
  }

  // config

  public getBookingCodeConfig(): Observable<any>{
    return this.http.get(this.bookingsUrl + "config/booking-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public putBookingCodeConfig(booking: any): Observable<any>{
    return this.http.put(this.bookingsUrl + "config/booking-code/" + this.customCookie.getCookie('hotel_id'), booking, this.authHeaders.headers);
  }

  public getNewBookingCodeConfig(): Observable<any>{
    return this.http.get(this.bookingsUrl + "config/new-booking-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  // dashboard

  public getBookingCount(): Observable<any>{
    return this.http.get(this.bookingsUrl + "dashboard/booking-count?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public getBookingAnnotate(): Observable<any>{
    return this.http.get(this.bookingsUrl + "dashboard/booking-annotate?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}
