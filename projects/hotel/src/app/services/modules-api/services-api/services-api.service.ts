import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class ServicesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  servicesUrl = environment.apiUrl + 'hotel-modules/services/';

  // create and get all service belonging to user

  public getAccountService(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.servicesUrl + "service?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&serviceing=" + sortField, this.authHeaders.headers);
  }

  public postService(service: any): Observable<any>{
    return this.http.post(this.servicesUrl + "service/", service, this.authHeaders.headers);
  }

  public getService(): Observable<any>{
    return this.http.get(this.servicesUrl + "service/" + sessionStorage.getItem('hotel_service_id'), this.authHeaders.headers);
  }

  public putService(service: any): Observable<any>{
    return this.http.put(this.servicesUrl + "service/" + sessionStorage.getItem('hotel_service_id'), service, this.authHeaders.headers);
  }

  public deleteService(): Observable<any>{
    return this.http.delete(this.servicesUrl + "service/" + sessionStorage.getItem('hotel_service_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.servicesUrl + "service/" + sessionStorage.getItem('hotel_id'), totalData, this.authHeaders.headers);
  // }

  // service items

  public getServiceItem(): Observable<any>{
    return this.http.get(this.servicesUrl + "service-item?service=" + sessionStorage.getItem('hotel_service_id'), this.authHeaders.headers);
  }

  public postItem(item: any): Observable<any>{
    return this.http.post(this.servicesUrl + "service-item/", item, this.authHeaders.headers);
  }

  public getItem(itemId: any): Observable<any>{
    return this.http.get(this.servicesUrl + "service-item/" + itemId, this.authHeaders.headers);
  }

  public putItem(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.servicesUrl + "service-item/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteItem(itemId: any): Observable<any>{
    return this.http.delete(this.servicesUrl + "service-item/" + itemId, this.authHeaders.headers);
  }

  // config

  public getServiceCodeConfig(): Observable<any>{
    return this.http.get(this.servicesUrl + "config/service-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public putServiceCodeConfig(service: any): Observable<any>{
    return this.http.put(this.servicesUrl + "config/service-code/" + this.customCookie.getCookie('hotel_id'), service, this.authHeaders.headers);
  }

  public getNewServiceCodeConfig(): Observable<any>{
    return this.http.get(this.servicesUrl + "config/new-service-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  // dashboard

  public getServiceCount(): Observable<any>{
    return this.http.get(this.servicesUrl + "dashboard/service-count?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public getServiceAnnotate(): Observable<any>{
    return this.http.get(this.servicesUrl + "dashboard/service-annotate?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}
