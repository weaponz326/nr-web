import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TablesApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  public getAccountTable(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-tables/table?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postTable(table: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-tables/table/", table);
  }

  public getSingleTable(id: any): Observable<any>{
    return this.http.get(this.restaurantApi + id);
  }

  public putTable(id: any, data: any): Observable<any>{
    return this.http.put(this.restaurantApi + id, data);
  }

  public deleteTable(id: any): Observable<any>{
    return this.http.delete(this.restaurantApi + id);
  }

}