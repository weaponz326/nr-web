import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class HousekeepingApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  housekeepingUrl = environment.apiUrl + 'hotel-modules/housekeeping/';

  // create and get all housekeeping belonging to user

  public getAccountHousekeeping(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.housekeepingUrl + "housekeeping?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&housekeepinging=" + sortField, this.authHeaders.headers);
  }

  public postHousekeeping(housekeeping: any): Observable<any>{
    return this.http.post(this.housekeepingUrl + "housekeeping/", housekeeping, this.authHeaders.headers);
  }

  public getHousekeeping(): Observable<any>{
    return this.http.get(this.housekeepingUrl + "housekeeping/" + sessionStorage.getItem('hotel_housekeeping_id'), this.authHeaders.headers);
  }

  public putHousekeeping(housekeeping: any): Observable<any>{
    return this.http.put(this.housekeepingUrl + "housekeeping/" + sessionStorage.getItem('hotel_housekeeping_id'), housekeeping, this.authHeaders.headers);
  }

  public deleteHousekeeping(): Observable<any>{
    return this.http.delete(this.housekeepingUrl + "housekeeping/" + sessionStorage.getItem('hotel_housekeeping_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.housekeepingUrl + "housekeeping/" + sessionStorage.getItem('hotel_id'), totalData, this.authHeaders.headers);
  // }

  // housekeeping items

  public getHousekeepingChecklist(): Observable<any>{
    return this.http.get(this.housekeepingUrl + "checklist?housekeeping=" + sessionStorage.getItem('hotel_housekeeping_id'), this.authHeaders.headers);
  }

  public postChecklist(checklist: any): Observable<any>{
    return this.http.post(this.housekeepingUrl + "checklist/", checklist, this.authHeaders.headers);
  }

  public getChecklist(checklistId: any): Observable<any>{
    return this.http.get(this.housekeepingUrl + "checklist/" + checklistId, this.authHeaders.headers);
  }

  public putChecklist(checklistId: any, checklistData: any): Observable<any>{
    return this.http.put(this.housekeepingUrl + "checklist/" + checklistId, checklistData, this.authHeaders.headers);
  }

  public deleteChecklist(checklistId: any): Observable<any>{
    return this.http.delete(this.housekeepingUrl + "checklist/" + checklistId, this.authHeaders.headers);
  }

  // config

  public getHousekeepingCodeConfig(): Observable<any>{
    return this.http.get(this.housekeepingUrl + "config/housekeeping-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public putHousekeepingCodeConfig(housekeeping: any): Observable<any>{
    return this.http.put(this.housekeepingUrl + "config/housekeeping-code/" + this.customCookie.getCookie('hotel_id'), housekeeping, this.authHeaders.headers);
  }

  public getNewHousekeepingCodeConfig(): Observable<any>{
    return this.http.get(this.housekeepingUrl + "config/new-housekeeping-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  // dashboard

  public getHousekeepingCount(): Observable<any>{
    return this.http.get(this.housekeepingUrl + "dashboard/housekeeping-count?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public getHousekeepingAnnotate(): Observable<any>{
    return this.http.get(this.housekeepingUrl + "dashboard/housekeeping-annotate?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}
