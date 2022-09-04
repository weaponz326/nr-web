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

  restaurantUrl = environment.restaurantUrl;

  // items

  public getAccountStockItem(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantUrl + "module-kitchen-stock/stock-item?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postStockItem(item: any): Observable<any>{
    return this.http.post(this.restaurantUrl + "module-kitchen-stock/stock-item/", item);
  }

  public putStockItem(id: any, data: any): Observable<any>{
    return this.http.put(this.restaurantUrl + id, data);
  }

  public deleteStockItem(id: any): Observable<any>{
    return this.http.delete(this.restaurantUrl + id);
  }

}
