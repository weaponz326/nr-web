import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/restaurant/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class DeliveriesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  deliveriesUrl = environment.apiUrl + 'restaurant-modules/deliveries/';

  public getAccountDelivery(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.deliveriesUrl + "delivery?account=" + this.customCookie.getCookie('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postDelivery(item: any): Observable<any>{
    return this.http.post(this.deliveriesUrl + "delivery/", item, this.authHeaders.headers);
  }

  public getDelivery(): Observable<any>{
    return this.http.get(this.deliveriesUrl + "delivery/" + sessionStorage.getItem('restaurant_delivery_id'), this.authHeaders.headers);
  }

  public putDelivery(itemData: any): Observable<any>{
    return this.http.put(this.deliveriesUrl + "delivery/" + sessionStorage.getItem('restaurant_delivery_id'), itemData, this.authHeaders.headers);
  }

  public deleteDelivery(): Observable<any>{
    return this.http.delete(this.deliveriesUrl + "delivery/" + sessionStorage.getItem('restaurant_delivery_id'), this.authHeaders.headers);
  }

  // dashboard

  public getDeliveryCount(): Observable<any>{
    return this.http.get(this.deliveriesUrl + "dashboard/delivery-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public getDeliveryAnnotate(): Observable<any>{
    return this.http.get(this.deliveriesUrl + "dashboard/delivery-annotate?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

}
