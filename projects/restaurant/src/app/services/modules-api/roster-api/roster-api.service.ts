import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class RosterApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  rosterUrl = environment.apiUrl + 'restaurant-modules/roster/';

  // roster

  public getAccountRoster(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.rosterUrl + "roster?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postRoster(roster: any): Observable<any>{
    return this.http.post(this.rosterUrl + "roster/", roster, this.authHeaders.headers);
  }

  public getRoster(): Observable<any>{
    return this.http.get(this.rosterUrl + "roster/" + sessionStorage.getItem('restaurant_roster_id'), this.authHeaders.headers);
  }

  public putRoster(roster: any): Observable<any>{
    return this.http.put(this.rosterUrl + "roster/" + sessionStorage.getItem('restaurant_roster_id'), roster, this.authHeaders.headers);
  }

  public deleteRoster(): Observable<any>{
    return this.http.delete(this.rosterUrl + "roster/" + sessionStorage.getItem('restaurant_roster_id'), this.authHeaders.headers);
  }

  // shifts

  public getRosterShift(): Observable<any>{
    return this.http.get(this.rosterUrl + "shift?roster=" + sessionStorage.getItem('restaurant_roster_id'), this.authHeaders.headers);
  }

  public postShift(shift: any): Observable<any>{
    return this.http.post(this.rosterUrl + "shift/", shift, this.authHeaders.headers);
  }

  public putShift(shiftId: any, shift: any): Observable<any>{
    return this.http.put(this.rosterUrl + "shift/" + shiftId, shift, this.authHeaders.headers);
  }

  public deleteShift(shiftId: any): Observable<any>{
    return this.http.delete(this.rosterUrl + "shift/" + shiftId, this.authHeaders.headers);
  }

  // batches

  public getRosterBatch(): Observable<any>{
    return this.http.get(this.rosterUrl + "batch?roster=" + sessionStorage.getItem('restaurant_roster_id'), this.authHeaders.headers);
  }

  public postBatch(batch: any): Observable<any>{
    return this.http.post(this.rosterUrl + "batch/", batch, this.authHeaders.headers);
  }

  public putBatch(batchId: any, batch: any): Observable<any>{
    return this.http.put(this.rosterUrl + "batch/" + batchId, batch, this.authHeaders.headers);
  }

  public deleteBatch(batchId: any): Observable<any>{
    return this.http.delete(this.rosterUrl + "batch/" + batchId, this.authHeaders.headers);
  }

  // personnel

  public getRosterPersonnel(): Observable<any>{
    return this.http.get(this.rosterUrl + "personnel?roster=" + sessionStorage.getItem('restaurant_roster_id'), this.authHeaders.headers);
  }

  public postPersonnel(personnel: any): Observable<any>{
    return this.http.put(this.rosterUrl + "personnel/", personnel, this.authHeaders.headers);
  }

  public putPersonnel(personnelId: any, personnel: any): Observable<any>{
    return this.http.put(this.rosterUrl + "personnel/" + personnelId, personnel, this.authHeaders.headers);
  }

  public deletePersonnel(personnelId: any): Observable<any>{
    return this.http.delete(this.rosterUrl + "personnel/" + personnelId, this.authHeaders.headers);
  }

  // roster day

  public getRosterRosterDay(): Observable<any>{
    return this.http.get(this.rosterUrl + "roster-day?roster=" + sessionStorage.getItem('restaurant_roster_id'), this.authHeaders.headers);
  }

  public postRosterDay(rosterDay: any): Observable<any>{
    return this.http.post(this.rosterUrl + "roster-day/", rosterDay, this.authHeaders.headers);
  }

  public putRosterDay(id: any, data: any): Observable<any>{
    return this.http.put(this.rosterUrl + "roster-day/" + id, data, this.authHeaders.headers);
  }

  public deleteRosterDay(id: any): Observable<any>{
    return this.http.delete(this.rosterUrl + "roster-day/" + id, this.authHeaders.headers);
  }

  // dashboard

  public getRosterCount(): Observable<any>{
    return this.http.get(this.rosterUrl + "dashboard/roster-count?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

}
