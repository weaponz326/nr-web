import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  usersUrl = environment.apiUrl + 'personal-users/';

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

  public patchProfilePhoto(photo: File): Observable<any>{
    let formParams = new FormData();
    formParams.append('photo', photo);
    return this.http.patch(this.apiUrl + "auth/users/me/", formParams, this.authHeaders.headers)
  }

  public getUser(): Observable<any>{
    let token = new HttpHeaders()
      .set('Authorization', "Token " + localStorage.getItem('token'));    // for getting user after login without reloading page

    let headers = { 'headers': token };

    return this.http.get(this.apiUrl + "auth/users/me/", headers);
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

  public getSearchList(search: any, page: any, size: any): Observable<any>{
    return this.http.get(this.usersUrl + "search-list?search=" + search
      + "&page=" + page
      + "&size=" + size,
      this.authHeaders.headers);
  }

  public getSearchDetail(userId: any): Observable<any>{
    return this.http.get(this.usersUrl + "search-detail/" + userId, this.authHeaders.headers);
  }

}
