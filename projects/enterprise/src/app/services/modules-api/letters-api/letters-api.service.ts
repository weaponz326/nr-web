import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class LettersApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  accountsUrl = environment.apiUrl + 'enterprise-modules/letters/';

  // sent letters

  public getAccountSentLetters(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.accountsUrl + "sent-letter?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getSentLetter(letterId: any): Observable<any>{
    return this.http.get(this.accountsUrl + "sent-letter/" + letterId, this.authHeaders.headers);
  }

  public postSentLetter(letterData: any): Observable<any>{
    return this.http.post(this.accountsUrl + "sent-letter/", letterData, this.authHeaders.headers);
  }

  public putSentLetter(letterData: any, letterId: any): Observable<any>{
    return this.http.put(this.accountsUrl + "sent-letter/" + letterId, letterData, this.authHeaders.headers);
  }

  public deleteSentLetter(letterId: any): Observable<any>{
    return this.http.delete(this.accountsUrl + "sent-letter/" + letterId, this.authHeaders.headers);
  }

  // received letters

  public getAccountReceivedLetters(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.accountsUrl + "received-letter?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getReceivedLetter(letterId: any): Observable<any>{
    return this.http.get(this.accountsUrl + "received-letter/" + letterId, this.authHeaders.headers);
  }

  public postReceivedLetter(letterData: any): Observable<any>{
    return this.http.post(this.accountsUrl + "received-letter/", letterData, this.authHeaders.headers);
  }

  public putReceivedLetter(letterData: any, letterId: any): Observable<any>{
    return this.http.put(this.accountsUrl + "received-letter/" + letterId, letterData, this.authHeaders.headers);
  }

  public deleteReceivedLetter(letterId: any): Observable<any>{
    return this.http.delete(this.accountsUrl + "received-letter/" + letterId, this.authHeaders.headers);
  }

}
