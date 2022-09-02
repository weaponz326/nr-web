import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  public postAccount(profile: any): Observable<any>{
    return this.http.post(this.restaurantApi + "accounts/account/", profile);
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
  
}
