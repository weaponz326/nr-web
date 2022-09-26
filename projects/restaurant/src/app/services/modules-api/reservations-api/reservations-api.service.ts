import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/restaurant/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class ReservationsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  reservationsUrl = environment.apiUrl + 'restaurant-modules/reservations/';

  // reservations
    
  public getAccountReservation(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.reservationsUrl + "reservation?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postReservation(reservation: any): Observable<any>{
    return this.http.post(this.reservationsUrl + "reservation/", reservation, this.authHeaders.headers);
  }

  public getReservation(): Observable<any>{
    return this.http.get(this.reservationsUrl + "reservation/" + sessionStorage.getItem("restaurant_reservation_id"), this.authHeaders.headers);
  }

  public putReservation(reservationData: any): Observable<any>{
    return this.http.put(this.reservationsUrl + "reservation/" + sessionStorage.getItem("restaurant_reservation_id"), reservationData, this.authHeaders.headers);
  }

  public deleteReservation(): Observable<any>{
    return this.http.delete(this.reservationsUrl + "reservation/" + sessionStorage.getItem("restaurant_reservation_id"), this.authHeaders.headers);
  }

  // reservation tables
    
  public getReservationReservationTable(): Observable<any>{
    return this.http.get(this.reservationsUrl + "reservation-table?account=" + sessionStorage.getItem('restaurant_reservation_id'), this.authHeaders.headers);
  }

  public postReservationTable(table: any): Observable<any>{
    return this.http.post(this.reservationsUrl + "reservation-table/", table, this.authHeaders.headers);
  }

  public deleteReservationTable(id: any): Observable<any>{
    return this.http.delete(this.reservationsUrl + "reservation-table/" + id, this.authHeaders.headers);
  }

  // dashboard

  public getReservationCount(): Observable<any>{
    return this.http.get(this.reservationsUrl + "dashboard/reservation-count?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public getReservationAnnotate(): Observable<any>{
    return this.http.get(this.reservationsUrl + "dashboard/reservation-annotate?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

}
