import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/restaurant/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  ordersUrl = environment.apiUrl + 'restaurant-modules/orders/';

  // create and get all order belonging to user

  public getAccountOrder(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.ordersUrl + "order?account=" + this.customCookie.getCookie('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postOrder(order: any): Observable<any>{
    return this.http.post(this.ordersUrl + "order/", order, this.authHeaders.headers);
  }

  public getOrder(): Observable<any>{
    return this.http.get(this.ordersUrl + "order/" + sessionStorage.getItem('restaurant_order_id'), this.authHeaders.headers);
  }

  public putOrder(order: any): Observable<any>{
    return this.http.put(this.ordersUrl + "order/" + sessionStorage.getItem('restaurant_order_id'), order, this.authHeaders.headers);
  }

  public deleteOrder(): Observable<any>{
    return this.http.delete(this.ordersUrl + "order/" + sessionStorage.getItem('restaurant_order_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.ordersUrl + "order/" + sessionStorage.getItem('restaurant_id'), totalData, this.authHeaders.headers);
  // }

  // order items

  public getOrderItem(): Observable<any>{
    return this.http.get(this.ordersUrl + "order-item?order=" + sessionStorage.getItem('restaurant_order_id'), this.authHeaders.headers);
  }

  public postItem(item: any): Observable<any>{
    return this.http.post(this.ordersUrl + "order-item/", item, this.authHeaders.headers);
  }

  public gettem(itemId: any): Observable<any>{
    return this.http.get(this.ordersUrl + "order-item/" + itemId, this.authHeaders.headers);
  }

  public putItem(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.ordersUrl + "order-item/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteItem(itemId: any): Observable<any>{
    return this.http.delete(this.ordersUrl + "order-item/" + itemId, this.authHeaders.headers);
  }

  // config

  public getOrderCodeConfig(): Observable<any>{
    return this.http.get(this.ordersUrl + "config/order-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public putOrderCodeConfig(order: any): Observable<any>{
    return this.http.put(this.ordersUrl + "config/order-code/" + this.customCookie.getCookie('restaurant_id'), order, this.authHeaders.headers);
  }

  public getNewOrderCodeConfig(): Observable<any>{
    return this.http.get(this.ordersUrl + "config/new-order-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  // dashboard

  public getOrderCount(): Observable<any>{
    return this.http.get(this.ordersUrl + "dashboard/order-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public getOrderAnnotate(): Observable<any>{
    return this.http.get(this.ordersUrl + "dashboard/order-annotate?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

}
