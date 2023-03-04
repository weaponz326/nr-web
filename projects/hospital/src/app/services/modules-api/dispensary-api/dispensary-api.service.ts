import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hospital/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class DispensaryApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  dispensaryUrl = environment.apiUrl + 'hospital-modules/dispensary/';

  // create and get all dispenses belonging to user

  public getAccountDispense(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.dispensaryUrl + "dispense?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postDispense(dispense: any): Observable<any>{
    return this.http.post(this.dispensaryUrl + "dispense/", dispense, this.authHeaders.headers);
  }

  public getDispense(): Observable<any>{
    return this.http.get(this.dispensaryUrl + "dispense/" + sessionStorage.getItem('hospital_dispense_id'), this.authHeaders.headers);
  }

  public putDispense(dispense: any): Observable<any>{
    return this.http.put(this.dispensaryUrl + "dispense/" + sessionStorage.getItem('hospital_dispense_id'), dispense, this.authHeaders.headers);
  }

  public deleteDispense(): Observable<any>{
    return this.http.delete(this.dispensaryUrl + "dispense/" + sessionStorage.getItem('hospital_dispense_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.dispensaryUrl + "dispense/" + sessionStorage.getItem('hospital_id'), totalData, this.authHeaders.headers);
  // }

  // dispense items

  public getDispenseItem(): Observable<any>{
    return this.http.get(this.dispensaryUrl + "dispense-item?dispense=" + sessionStorage.getItem('hospital_dispense_id'), this.authHeaders.headers);
  }

  public postItem(item: any): Observable<any>{
    return this.http.post(this.dispensaryUrl + "dispense-item/", item, this.authHeaders.headers);
  }

  public getItem(itemId: any): Observable<any>{
    return this.http.get(this.dispensaryUrl + "dispense-item/" + itemId, this.authHeaders.headers);
  }

  public putItem(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.dispensaryUrl + "dispense-item/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteItem(itemId: any): Observable<any>{
    return this.http.delete(this.dispensaryUrl + "dispense-item/" + itemId, this.authHeaders.headers);
  }

  // config

  public getDispenseCodeConfig(): Observable<any>{
    return this.http.get(this.dispensaryUrl + "config/dispense-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putDispenseCodeConfig(dispense: any): Observable<any>{
    return this.http.put(this.dispensaryUrl + "config/dispense-code/" + this.customCookie.getCookie('hospital_id'), dispense, this.authHeaders.headers);
  }

  public getNewDispenseCodeConfig(): Observable<any>{
    return this.http.get(this.dispensaryUrl + "config/new-dispense-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  // dashboard

  public getDispenseCount(): Observable<any>{
    return this.http.get(this.dispensaryUrl + "dashboard/dispense-count?account=" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public getDispenseAnnotate(): Observable<any>{
    return this.http.get(this.dispensaryUrl + "dashboard/dispense-annotate?account=" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}
