import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService 
  ) { }

  personalApi = environment.personalApi;
  headers = this.authHeaders.headers;
  refreshToken = this.authHeaders.refreshToken;

  public postSignup(signupForm: any): Observable<any>{
    return this.http.post(this.personalApi + "auth/users/", signupForm);
  }

  public putUser(updateForm: any): Observable<any>{
    return this.http.put(this.personalApi + "auth/users/me/", updateForm, this.headers);
  }

  public patchUser(updateForm: any): Observable<any>{
    return this.http.patch(this.personalApi + "auth/users/me/", updateForm, this.headers);
  }

  public getUser(): Observable<any>{
    return this.http.get(this.personalApi + "auth/users/me/", this.headers);
  }

  public postRecoveryEmail(email: any): Observable<any>{
    return this.http.post(this.personalApi + "auth/users/reset_password/", email);
  }

  public postResetPassword(resetForm: any): Observable<any>{
    return this.http.post(this.personalApi + "auth/users/reset_password_confirm/", resetForm);
  }

  public postLogin(loginForm: any): Observable<any>{
    return this.http.post(this.personalApi + "auth/jwt/create/", loginForm, this.headers);
  }

  public postTokenReferesh(): Observable<any>{
    return this.http.post(this.personalApi + "auth/jwt/refresh/", this.refreshToken, this.headers);
  }

  public postChangeEmail(emailForm: any): Observable<any>{
    return this.http.post(this.personalApi + "auth/users/set_email/", emailForm, this.headers);
  }

  public postChangePassword(passwordForm: any): Observable<any>{
    return this.http.post(this.personalApi + "auth/users/set_password/", passwordForm, this.headers);
  }

  public deleteUser(deleteForm: any): Observable<any>{
    return this.http.delete(this.personalApi + "auth/users/me/", deleteForm);
  }


  
  // personal search

  public getSearchList(search: any): Observable<any>{
    return this.http.get(this.personalApi + "users/search-list?search=" + search, this.authHeaders.headers);
  }

  public getSearchDetail(userId: any): Observable<any>{
    return this.http.get(this.personalApi + "users/search-detail/" + userId, this.authHeaders.headers);
  }

}
