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

  public postAccount(profile: any): Observable<any>{
    return this.http.post(this.restaurantApi + "accounts/account/", profile);
  }

  public getAccount(): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/account/" + localStorage.getItem('restaurant_id'));
  }

  public hasAccount(): Observable<any>{
    console.log(localStorage.getItem('personal_id'));
    return this.http.post(this.restaurantApi + "accounts/has-account/", { personal_id: localStorage.getItem('personal_id') });
  }

  public getUserAccounts(): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/user-accounts?personal_id=" + localStorage.getItem('personal_id'));
  }

  public postSelectedAccount(accountId: any): Observable<any>{
    return this.http.post(this.restaurantApi + "accounts/active-account/", { active_account: accountId }, { withCredentials: true });
  }

  // search

  public getSearchResults(input: string): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/search?search=" + input, this.authHeaders.headers);
  }

  public getSearchDetail(account: string): Observable<any>{
    return this.http.get(this.restaurantApi + "accounts/search/" + account, this.authHeaders.headers);
  }
  
}
