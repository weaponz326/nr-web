import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class DeliveriesApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  public getAccountDelivery(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-deliveries/delivery?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postDelivery(item: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-deliveries/delivery/", item);
  }

  public getDelivery(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-deliveries/delivery/" + sessionStorage.getItem('restaurant_delivery_id'));
  }

  public putDelivery(itemData: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-deliveries/delivery/" + sessionStorage.getItem('restaurant_delivery_id'), itemData);
  }

  public deleteDelivery(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-deliveries/delivery/" + sessionStorage.getItem('restaurant_delivery_id'));
  }

}
