import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  settingsUrl = environment.apiUrl + 'personal-modules/settings/';

  public getExtendedProfile(): Observable<any>{
    return this.http.get(this.settingsUrl + "extended-profile/" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public putExtendedProfile(extended: any): Observable<any>{
    return this.http.put(this.settingsUrl + "extended-profile/" + localStorage.getItem('personal_id'), extended, this.authHeaders.headers);
  }

  public patchExtendedProfile(extended: any): Observable<any>{
    return this.http.patch(this.settingsUrl + "extended-profile/" + localStorage.getItem('personal_id'), extended, this.authHeaders.headers);
  }

  // invitation

  public getUserInvitation(): Observable<any>{
    return this.http.get(this.settingsUrl + "invitation?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public postInvitation(invitation: any): Observable<any>{
    return this.http.post(this.settingsUrl + "invitation/", invitation, this.authHeaders.headers);
  }

  public getInvitation(): Observable<any>{
    return this.http.get(this.settingsUrl + "invitation/" + sessionStorage.getItem('personal_invitation_id'), this.authHeaders.headers);
  }

  public putInvitation(invitation: any): Observable<any>{
    return this.http.put(this.settingsUrl + "invitation/" + sessionStorage.getItem('personal_invitation_id'), invitation, this.authHeaders.headers);
  }

  public deleteInvitation(): Observable<any>{
    return this.http.delete(this.settingsUrl + "invitation/" + sessionStorage.getItem('personal_invitation_id'), this.authHeaders.headers);
  }

}
