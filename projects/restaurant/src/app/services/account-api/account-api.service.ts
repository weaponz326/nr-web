import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  restaurantApi = environment.restaurantApi;

  public postAccount(account: any): Observable<any>{
    return this.http.post(this.restaurantApi + "accounts/account/", account);
  }

  public patchAccount(account: any): Observable<any>{
    return this.http.patch(this.restaurantApi + "accounts/account/" + localStorage.getItem('restaurant_id'), account);
  }

  public getAccount(): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/account/" + localStorage.getItem('restaurant_id'));
  }

  public putLogo(logo: File) {
    let formParams = new FormData();
    formParams.append('logo', logo);
    return this.http.put(this.restaurantApi + "module-settings/account/" + localStorage.getItem('restaurant_id'), formParams)
  }
  
  public hasAccount(): Observable<any>{
    console.log(localStorage.getItem('personal_id'));
    return this.http.post(this.restaurantApi + "accounts/has-account/", { personal_id: localStorage.getItem('personal_id') });
  }

  public getUserAccounts(): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/user-accounts?personal_id=" + localStorage.getItem('personal_id'));
  }

  // search

  public getSearchResults(input: string): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/search-list?search=" + input);
  }

  public getSearchDetail(account: string): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/search-detail/" + account);
  }
  
}
