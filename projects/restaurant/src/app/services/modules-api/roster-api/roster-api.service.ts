import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class RosterApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // roster

  public getAccountRoster(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/roster?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postRoster(roster: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-roster/roster/", roster);
  }

  public getRoster(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/roster/" + sessionStorage.getItem('restaurant_roster_id'));
  }

  public putRoster(roster: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-roster/roster/" + sessionStorage.getItem('restaurant_roster_id'), roster);
  }

  public deleteRoster(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-roster/roster/" + sessionStorage.getItem('restaurant_roster_id'));
  }

  // shifts

  public getRosterShift(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/shift?roster=" + sessionStorage.getItem('restaurant_roster_id'));
  }

  public postShift(shift: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-roster/shift/", shift);
  }

  public putShift(shiftId: any, shift: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-roster/shift/" + shiftId, shift);
  }

  public deleteShift(shiftId: any): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-roster/shift/" + shiftId);
  }

  // batches

  public getRosterBatch(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/batch?roster=" + sessionStorage.getItem('restaurant_roster_id'));
  }

  public postBatch(batch: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-roster/batch/", batch);
  }

  public putBatch(batchId: any, batch: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-roster/batch/" + batchId, batch);
  }

  public deleteBatch(batchId: any): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-roster/batch/" + batchId);
  }

  // personnel

  public getRosterPersonnel(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/personnel?roster=" + sessionStorage.getItem('restaurant_roster_id'));
  }

  public postPersonnel(personnel: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-roster/personnel/", personnel);
  }

  public putPersonnel(personnelId: any, personnel: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-roster/personnel/" + personnelId, personnel);
  }

  public deletePersonnel(personnelId: any): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-roster/personnel/" + personnelId);
  }

  public refreshPersonnel(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/refresh-personnel?roster=" + sessionStorage.getItem('restaurant_roster_id'));
  }

  // sheet

  public refreshSheet(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/refresh-sheet?roster=" + sessionStorage.getItem('restaurant_roster_id'));
  }

  public getRosterDays(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/roster-day?roster=" + sessionStorage.getItem('restaurant_roster_id'));
  }

  public getRosterSheet(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/roster-sheet?roster=" + sessionStorage.getItem('restaurant_roster_id'));
  }

  public postRosterSheet(sheet: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-roster/roster-sheet/", sheet);
  }

  // dashboard

  public getRosterCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-roster/dashboard/roster-count?account=" + localStorage.getItem('restaurant_id'));
  }

}
