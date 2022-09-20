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

  accountUrl = environment.apiUrl + 'restaurant-accounts/';

  public postAccount(account: any): Observable<any>{
    return this.http.post(this.accountUrl + "account/", account, this.authHeaders.headers);
  }

  public patchAccount(account: any): Observable<any>{
    return this.http.patch(this.accountUrl + "account/" + localStorage.getItem('restaurant_id'), account, this.authHeaders.headers);
  }

  public getAccount(): Observable<any>{
    return this.http.get(this.accountUrl + "account/" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public putLogo(logo: File) {
    let formParams = new FormData();
    formParams.append('logo', logo);
    return this.http.put(this.accountUrl + "account/" + localStorage.getItem('restaurant_id'), formParams, this.authHeaders.headers)
  }
  
  public hasAccount(): Observable<any>{
    console.log(localStorage.getItem('personal_id'));
    return this.http.post(this.accountUrl + "has-account/", { personal_id: localStorage.getItem('personal_id') }, this.authHeaders.headers);
  }

  public getUserAccounts(): Observable<any>{
    return this.http.get(this.accountUrl + "user-accounts?personal_id=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  // search

  public getSearchResults(input: string): Observable<any>{
    return this.http.get(this.accountUrl + "search-list?search=" + input, this.authHeaders.headers);
  }

  public getSearchDetail(account: string): Observable<any>{
    return this.http.get(this.accountUrl + "search-detail/" + account, this.authHeaders.headers);
  }
  
}
