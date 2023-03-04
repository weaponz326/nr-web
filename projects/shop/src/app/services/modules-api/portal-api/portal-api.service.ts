import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/shop/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class PortalApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  portalUrl = environment.apiUrl + 'shop-modules/portal/';

  // rink

  public getAllRinks(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.portalUrl + "rink-list?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public getRink(): Observable<any>{
    return this.http.get(this.portalUrl + "rink/" + sessionStorage.getItem('shop_rink_id'), this.authHeaders.headers);
  }

  public postRink(rink: any): Observable<any>{
    return this.http.post(this.portalUrl + "rink/", rink, this.authHeaders.headers);
  }

  public putRink(rink: any): Observable<any>{
    return this.http.put(this.portalUrl + "rink/" + sessionStorage.getItem('shop_rink_id'), rink, this.authHeaders.headers);
  }

  public deleteRink(): Observable<any>{
    return this.http.delete(this.portalUrl + "rink/" + sessionStorage.getItem('shop_rink_id'), this.authHeaders.headers);
  }

  // dashboard

  public getRinkShareCount(): Observable<any>{
    return this.http.get(this.portalUrl + "dashboard/rink-share-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public getRinkShareAnnotate(): Observable<any>{
    return this.http.get(this.portalUrl + "dashboard/rink-share-annotate?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}
