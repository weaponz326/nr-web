import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/restaurant/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  accountUrl = environment.apiUrl + 'restaurant-accounts/';

  public postAccount(account: any): Observable<any>{
    return this.http.post(this.accountUrl + "account/", account, this.authHeaders.headers);
  }

  public putAccount(account: any): Observable<any>{
    return this.http.put(this.accountUrl + "account/" + this.customCookie.getCookie('restaurant_id'), account, this.authHeaders.headers);
  }

  public patchAccount(account: any): Observable<any>{
    return this.http.patch(this.accountUrl + "account/" + this.customCookie.getCookie('restaurant_id'), account, this.authHeaders.headers);
  }

  public getAccount(): Observable<any>{
    return this.http.get(this.accountUrl + "account/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public putLogo(logo: File) {
    let formParams = new FormData();
    formParams.append('logo', logo);
    return this.http.put(this.accountUrl + "account/" + this.customCookie.getCookie('restaurant_id'), formParams, this.authHeaders.headers)
  }
  
  public hasAccount(): Observable<any>{
    console.log(this.customCookie.getCookie('personal_id'));
    return this.http.post(this.accountUrl + "has-account/", { personal_id: this.customCookie.getCookie('personal_id') }, this.authHeaders.headers);
  }

  public getUserAccounts(): Observable<any>{
    return this.http.get(this.accountUrl + "user-accounts?personal_id=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  // search

  public getSearchResults(input: string, page: any, size: any): Observable<any>{
    return this.http.get(this.accountUrl + "search-list?account=" + this.customCookie.getCookie('restaurant_id') 
      + "&search=" + input
      + "&page=" + page
      + "&size=" + size,
      this.authHeaders.headers);
  }

  public getSearchDetail(account: string): Observable<any>{
    return this.http.get(this.accountUrl + "search-detail/" + account, this.authHeaders.headers);
  }
  
}
