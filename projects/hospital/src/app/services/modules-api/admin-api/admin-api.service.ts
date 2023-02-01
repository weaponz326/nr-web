import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hotel/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  adminUrl = environment.apiUrl + 'hotel-modules/admin/';

  // account user

  // all users belonging to an account
  public getAccountAccountUsers(): Observable<any>{
    return this.http.get(this.adminUrl + "account-user?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public getAccountUser(): Observable<any>{
    return this.http.get(this.adminUrl + "account-user/" + sessionStorage.getItem('hotel_account_user_id'), this.authHeaders.headers);
  }

  public putAccountUser(accountUser: any): Observable<any>{
    return this.http.put(this.adminUrl + "account-user/" + sessionStorage.getItem('hotel_account_user_id'), accountUser, this.authHeaders.headers);
  }

  public deleteAccountUser(): Observable<any>{
    return this.http.delete(this.adminUrl + "account-user/" + sessionStorage.getItem('hotel_account_user_id'), this.authHeaders.headers);
  }

  // all accounts of belonging to a user
  public getAccountUserAccounts(): Observable<any>{
    return this.http.get(this.adminUrl + "account-user-account?" + "&personal_id=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  // user level for modules config access
  public getAccountUserLevel(): Observable<any>{
    return this.http.get(this.adminUrl + "account-user/" + sessionStorage.getItem('hotel_user_access_id'), this.authHeaders.headers);
  }

  // user access

  public getUserAccess(): Observable<any>{
    return this.http.get(this.adminUrl + "access/" + sessionStorage.getItem('hotel_account_user_id'), this.authHeaders.headers);
  }

  public putUserAccess(userAccess: any): Observable<any>{
    return this.http.put(this.adminUrl + "access/" + sessionStorage.getItem('hotel_account_user_id'), userAccess, this.authHeaders.headers);
  }

  public deleteUserAccess(): Observable<any>{
    return this.http.delete(this.adminUrl + "access/" + sessionStorage.getItem('hotel_account_user_id'), this.authHeaders.headers);
  }

  // user for home guard access
  public getAccessAccess(): Observable<any>{
    return this.http.get(this.adminUrl + "access/" + sessionStorage.getItem('hotel_user_access_id'), this.authHeaders.headers);
  }

  // invitations

  public postInvitation(invitation: any): Observable<any>{
    return this.http.post(this.adminUrl + "invitation/", invitation, this.authHeaders.headers);
  }

  public getInvitation(): Observable<any>{
    return this.http.get(this.adminUrl + "invitation/" + sessionStorage.getItem('hotel_invitation_id'), this.authHeaders.headers);
  }

  public getAccountInvitation(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.adminUrl + "invitation?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  // dashboard

  public getAccountUserCount(): Observable<any>{
    return this.http.get(this.adminUrl + "dashboard/account-user-count?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}
