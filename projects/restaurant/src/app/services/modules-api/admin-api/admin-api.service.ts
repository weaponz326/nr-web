import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  restaurantApi = environment.restaurantApi;
  personalApi = environment.personalApi;

  public getSearchResults(input: string): Observable<any>{
    return this.http.get(this.personalApi + "users/search?search=" + input, this.authHeaders.headers);
  }

  public getSearchDetail(account: string): Observable<any>{
    return this.http.get(this.personalApi + "users/search/" + account, this.authHeaders.headers);
  }

  // account user

  // all users belonging to an account
  public getAccountAccountUsers(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-admin/account-user?account=" + localStorage.getItem('restaurant_id'));
  }

  public getAccountUser(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-admin/account-user/" + sessionStorage.getItem('restaurant_account_user_id'));
  }

  public putAccountUser(accountUser: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-admin/account-user/" + sessionStorage.getItem('restaurant_account_user_id'), accountUser);
  }

  public deleteAccountUser(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-admin/account-user/" + sessionStorage.getItem('restaurant_account_user_id'));
  }

  // all accounts of belonging to a user
  public getAccountUserAccounts(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-admin/account-user-account?" + "&personal_id=" + localStorage.getItem('personal_id'));
  }

  // user access

  public getUserAccess(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-admin/access/" + sessionStorage.getItem('restaurant_account_user_id'));
  }

  public putUserAccess(userAccess: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-admin/access/" + sessionStorage.getItem('restaurant_account_user_id'), userAccess);
  }

  public deleteUserAccess(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-admin/access/" + sessionStorage.getItem('restaurant_account_user_id'));
  }

  // invitations

  public postInvitation(invitation: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-admin/invitation/", invitation);
  }

  public getInvitation(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-admin/invitation/" + sessionStorage.getItem('restaurant_invitation_id'));
  }

  public getAccountInvitation(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-admin/invitation?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  // dashboard

  public getAccountUserCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-admin/dashboard/account-user-count?account=" + localStorage.getItem('restaurant_id'));
  }

}
