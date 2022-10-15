import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class TablesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  tablesUrl = environment.apiUrl + 'restaurant-modules/tables/';

  public getAccountTable(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.tablesUrl + "table?account=" + this.customCookie.getCookie('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postTable(table: any): Observable<any>{
    return this.http.post(this.tablesUrl + "table/", table, this.authHeaders.headers);
  }

  public getTable(id: any): Observable<any>{
    return this.http.get(this.tablesUrl + "table/" + id, this.authHeaders.headers);
  }

  public putTable(id: any, data: any): Observable<any>{
    return this.http.put(this.tablesUrl + "table/" + id, data, this.authHeaders.headers);
  }

  public deleteTable(id: any): Observable<any>{
    return this.http.delete(this.tablesUrl + "table/" + id, this.authHeaders.headers);
  }

  // dashboard

  public getTableCount(): Observable<any>{
    return this.http.get(this.tablesUrl + "dashboard/table-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

}
