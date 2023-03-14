import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AssetsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  assetsUrl = environment.apiUrl + 'hotel-modules/assets/';

  // assets

  public getAccountAsset(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.assetsUrl + "asset?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postAsset(asset: any): Observable<any>{
    return this.http.post(this.assetsUrl + "asset/", asset, this.authHeaders.headers);
  }

  public getAsset(): Observable<any>{
    return this.http.get(this.assetsUrl + "asset/" + sessionStorage.getItem('hotel_asset_id'), this.authHeaders.headers);
  }

  public putAsset(asset: any): Observable<any>{
    return this.http.put(this.assetsUrl + "asset/" + sessionStorage.getItem('hotel_asset_id'), asset, this.authHeaders.headers);
  }

  public deleteAsset(): Observable<any>{
    return this.http.delete(this.assetsUrl + "asset/" + sessionStorage.getItem('hotel_asset_id'), this.authHeaders.headers);
  }

  // config

  public getAssetCodeConfig(): Observable<any>{
    return this.http.get(this.assetsUrl + "config/asset-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public putAssetCodeConfig(asset: any): Observable<any>{
    return this.http.put(this.assetsUrl + "config/asset-code/" + this.customCookie.getCookie('hotel_id'), asset, this.authHeaders.headers);
  }

  public getNewAssetCodeConfig(): Observable<any>{
    return this.http.get(this.assetsUrl + "config/new-asset-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}
