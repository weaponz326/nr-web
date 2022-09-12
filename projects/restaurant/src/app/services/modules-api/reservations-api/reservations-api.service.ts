import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ReservationsApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // reservations
    
  public getAccountReservation(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-reservations/reservation?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postReservation(reservation: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-reservations/reservation/", reservation);
  }

  public getReservation(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-reservations/reservation/" + sessionStorage.getItem("restaurant_reservation_id"));
  }

  public putReservation(reservationData: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-reservations/reservation/" + sessionStorage.getItem("restaurant_reservation_id"), reservationData);
  }

  public deleteReservation(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-reservations/reservation/" + sessionStorage.getItem("restaurant_reservation_id"));
  }

  // reservation tables
    
  public getReservationReservationTable(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-reservations/reservation-table?account=" + sessionStorage.getItem('restaurant_reservation_id'));
  }

  public postReservationTable(table: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-reservations/reservation-table/", table);
  }

  public deleteReservationTable(id: any): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-reservations/reservation-table/" + id);
  }

  // dashboard

  public getReservationCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-reservations/dashboard/reservation-count?account=" + localStorage.getItem('restaurant_id'));
  }

  public getReservationAnnotate(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-reservations/dashboard/reservation-annotate?account=" + localStorage.getItem('restaurant_id'));
  }

}
