import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class PortalApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  restaurantApi = environment.restaurantApi;

  // rink

  public getAllRinks(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-portal/rink-list?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getRink(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-portal/rink/" + sessionStorage.getItem('restaurant_rink_id'), this.authHeaders.headers);
  }

  public postRink(rink: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-portal/rink/", rink, this.authHeaders.headers);
  }

  public putRink(rink: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-portal/rink/" + sessionStorage.getItem('restaurant_rink_id'), rink, this.authHeaders.headers);
  }

  public deleteRink(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-portal/rink/" + sessionStorage.getItem('restaurant_rink_id'), this.authHeaders.headers);
  }

  // dashboard

  public getRinkShareCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-portal/dashboard/rink-share-count?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public getRinkShareAnnotate(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-portal/dashboard/rink-share-annotate?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

}
