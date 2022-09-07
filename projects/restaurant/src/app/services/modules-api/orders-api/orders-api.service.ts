import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // create and get all order belonging to user

  public getAccountOrder(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-orders/order?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postOrder(order: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-orders/order/", order);
  }

  public getOrder(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-orders/order/" + sessionStorage.getItem('restaurant_order_id'));
  }

  public putOrder(order: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-orders/order/" + sessionStorage.getItem('restaurant_order_id'), order);
  }

  public deleteOrder(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-orders/order/" + sessionStorage.getItem('restaurant_order_id'));
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.restaurantApi + "module-orders/order/" + sessionStorage.getItem('restaurant_id'), totalData);
  // }

  // order items

  public getOrderItem(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-orders/order-item?order=" + sessionStorage.getItem('restaurant_order_id'));
  }

  public postItem(item: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-orders/order-item/", item);
  }

  public gettem(itemId: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-orders/order-item/" + itemId);
  }

  public putItem(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-orders/order-item/" + itemId, itemData);
  }

  public deleteItem(itemId: any): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-orders/order-item/" + itemId);
  }

}
