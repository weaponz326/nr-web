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

  personalApi = environment.personalApi;

  public getExtendedProfile(): Observable<any>{
    return this.http.get(this.personalApi + "module-settings/extended-profile/" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public putExtendedProfile(extended: any): Observable<any>{
    return this.http.put(this.personalApi + "module-settings/extended-profile/" + localStorage.getItem('personal_id'), extended, this.authHeaders.headers);
  }

  public patchExtendedProfile(extended: any): Observable<any>{
    return this.http.patch(this.personalApi + "module-settings/extended-profile/" + localStorage.getItem('personal_id'), extended, this.authHeaders.headers);
  }

}
