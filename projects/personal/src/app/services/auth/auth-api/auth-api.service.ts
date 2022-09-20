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

  apiUrl = environment.apiUrl;
  headers = this.authHeaders.headers;

  // auth

  public postLogin(loginForm: any): Observable<any>{
    return this.http.post(this.apiUrl + "auth/token/login/", loginForm);
  }

  public postLogout(): Observable<any>{
    return this.http.post(this.apiUrl + "auth/token/logout/", localStorage.getItem('token'), this.headers);
  }

  // user

  public postSignup(signupForm: any): Observable<any>{
    return this.http.post(this.apiUrl + "auth/users/", signupForm);
  }

  public putUser(updateForm: any): Observable<any>{
    return this.http.put(this.apiUrl + "auth/users/me/", updateForm, this.headers);
  }

  public patchUser(updateForm: any): Observable<any>{
    return this.http.patch(this.apiUrl + "auth/users/me/", updateForm, this.headers);
  }

  public getUser(): Observable<any>{
    return this.http.get(this.apiUrl + "auth/users/me/", this.headers);
  }

  public deleteUser(deleteForm: any): Observable<any>{
    return this.http.delete(this.apiUrl + "auth/users/me/", deleteForm);
  }

  public postRecoveryEmail(email: any): Observable<any>{
    return this.http.post(this.apiUrl + "auth/users/reset_password/", email);
  }

  public postResetPassword(resetForm: any): Observable<any>{
    return this.http.post(this.apiUrl + "auth/users/reset_password_confirm/", resetForm);
  }

  public postChangeEmail(emailForm: any): Observable<any>{
    return this.http.post(this.apiUrl + "auth/users/set_email/", emailForm, this.headers);
  }

  public postChangePassword(passwordForm: any): Observable<any>{
    return this.http.post(this.apiUrl + "auth/users/set_password/", passwordForm, this.headers);
  }

  // personal search

  public getSearchList(search: any): Observable<any>{
    return this.http.get(this.apiUrl + "users/search-list?search=" + search, this.authHeaders.headers);
  }

  public getSearchDetail(userId: any): Observable<any>{
    return this.http.get(this.apiUrl + "users/search-detail/" + userId, this.authHeaders.headers);
  }

}
