import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  settingsUrl = environment.apiUrl + 'personal-modules/settings/';

  public getExtendedProfile(): Observable<any>{
    return this.http.get(this.settingsUrl + "extended-profile/" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public putExtendedProfile(extended: any): Observable<any>{
    return this.http.put(this.settingsUrl + "extended-profile/" + this.customCookie.getCookie('personal_id'), extended, this.authHeaders.headers);
  }

  public patchExtendedProfile(extended: any): Observable<any>{
    return this.http.patch(this.settingsUrl + "extended-profile/" + this.customCookie.getCookie('personal_id'), extended, this.authHeaders.headers);
  }

  // invitation

  public getUserInvitation(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.settingsUrl + "invitation?user=" + this.customCookie.getCookie('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public postInvitation(invitation: any): Observable<any>{
    return this.http.post(this.settingsUrl + "invitation/", invitation, this.authHeaders.headers);
  }

  public getInvitation(invitationId: any): Observable<any>{
    return this.http.get(this.settingsUrl + "invitation/" + invitationId, this.authHeaders.headers);
  }

  public putInvitation(invitationId: any, invitationData: any): Observable<any>{
    return this.http.put(this.settingsUrl + "invitation/" + invitationId, invitationData, this.authHeaders.headers);
  }

  public deleteInvitation(invitationId: any): Observable<any>{
    return this.http.delete(this.settingsUrl + "invitation/" + invitationId, this.authHeaders.headers);
  }

  // all user suite accounts

  public getAllUserSuiteAccount(): Observable<any>{
    return this.http.get(this.settingsUrl + "all-user-suite-account?personal_id=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public deleteAccountUser(userAccountId: any, accountType: any): Observable<any>{
    return this.http.delete(this.settingsUrl + "all-user-suite-account?acount_type=" + accountType + "/" + userAccountId, this.authHeaders.headers);
  }

  // dashboard

  public getAllUserAccountCount(): Observable<any>{
    return this.http.get(this.settingsUrl + "dashboard/all-user-suite-account-count?personal_id=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public getUserAccountShare(): Observable<any>{
    return this.http.get(this.settingsUrl + "dashboard/user-suite-account-share?personal_id=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

}
