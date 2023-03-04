import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class MarkettingApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  markettingUrl = environment.apiUrl + 'shop-modules/marketting/';

  // marketting

  public getAccountCampaign(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.markettingUrl + "campaign?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postCampaign(campaign: any): Observable<any>{
    return this.http.post(this.markettingUrl + "campaign/", campaign, this.authHeaders.headers);
  }

  public getCampaign(): Observable<any>{
    return this.http.get(this.markettingUrl + "campaign/" + sessionStorage.getItem('shop_campaign_id'), this.authHeaders.headers);
  }

  public putCampaign(campaign: any): Observable<any>{
    return this.http.put(this.markettingUrl + "campaign/" + sessionStorage.getItem('shop_campaign_id'), campaign, this.authHeaders.headers);
  }

  public deleteCampaign(): Observable<any>{
    return this.http.delete(this.markettingUrl + "campaign/" + sessionStorage.getItem('shop_campaign_id'), this.authHeaders.headers);
  }

  // config

  public getCampaignCodeConfig(): Observable<any>{
    return this.http.get(this.markettingUrl + "config/campaign-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putCampaignCodeConfig(campaign: any): Observable<any>{
    return this.http.put(this.markettingUrl + "config/campaign-code/" + this.customCookie.getCookie('shop_id'), campaign, this.authHeaders.headers);
  }

  public getNewCampaignCodeConfig(): Observable<any>{
    return this.http.get(this.markettingUrl + "config/new-campaign-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }
  
  // dashboard

  public getCampaignCount(): Observable<any>{
    return this.http.get(this.markettingUrl + "dashboard/campaign-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }
  
}
