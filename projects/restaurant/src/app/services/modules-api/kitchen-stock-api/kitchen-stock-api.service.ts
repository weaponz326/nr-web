import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class KitchenStockApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // items

  public getAccountStockItem(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-kitchen-stock/stock-item?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postStockItem(item: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-kitchen-stock/stock-item/", item);
  }

  public putStockItem(id: any, data: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-kitchen-stock/stock-item/" + id, data);
  }

  public deleteStockItem(id: any): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-kitchen-stock/stock-item/" + id);
  }

  // dashboard

  public getStockItemCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-kitchen-stock/dashboard/stock-item-count?account=" + localStorage.getItem('restaurant_id'));
  }

  public getOutOfStockCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-kitchen-stock/dashboard/out-of-stock-count?account=" + localStorage.getItem('restaurant_id'));
  }

}
