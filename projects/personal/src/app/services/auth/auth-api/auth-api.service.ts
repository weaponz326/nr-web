import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  postSetPassword(value: Partial<{ password: string | null; rePassword: string | null; currentPassword: string | null; }>) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService 
  ) { }

  personalUrl = environment.personalUrl;
  headers = this.authHeaders.headers

  public postSignup(signupForm: any): Observable<any>{
    return this.http.post(this.personalUrl + "auth/users/", signupForm);
  }

  public putUser(updateForm: any): Observable<any>{
    return this.http.put(this.personalUrl + "auth/users/me/", updateForm, this.headers);
  }

  public getUser(): Observable<any>{
    return this.http.get(this.personalUrl + "auth/users/me/", this.headers);
  }

  public deleteUser(deleteForm: any): Observable<any>{
    return this.http.get(this.personalUrl + "auth/users/me/", deleteForm);
  }

  public postRecoveryEmail(email: any): Observable<any>{
    return this.http.post(this.personalUrl + "auth/users/reset_password/", email);
  }

  public postResetPassword(resetForm: any): Observable<any>{
    return this.http.post(this.personalUrl + "auth/users/reset_password_confirm/", resetForm);
  }

  public postLogin(loginForm: any): Observable<any>{
    return this.http.post(this.personalUrl + "auth/jwt/create/", loginForm, this.headers);
  }

  public postChangeEmail(emailForm: any): Observable<any>{
    return this.http.post(this.personalUrl + "auth/users/set_email/", emailForm, this.headers);
  }

  public postChangePassword(passwordForm: any): Observable<any>{
    return this.http.post(this.personalUrl + "auth/users/set_password/", passwordForm, this.headers);
  }

}
