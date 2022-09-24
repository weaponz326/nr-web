import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class PortalApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  portalUrl = environment.apiUrl + 'personal-modules/portal/';

  // rink

  public getAllRinks(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.portalUrl + "rink-list?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getRink(): Observable<any>{
    return this.http.get(this.portalUrl + "rink/" + sessionStorage.getItem('personal_rink_id'), this.authHeaders.headers);
  }

  public postRink(rink: any): Observable<any>{
    return this.http.post(this.portalUrl + "rink/", rink, this.authHeaders.headers);
  }

  public putRink(rink: any): Observable<any>{
    return this.http.put(this.portalUrl + "rink/" + sessionStorage.getItem('personal_rink_id'), rink, this.authHeaders.headers);
  }

  public deleteRink(): Observable<any>{
    return this.http.delete(this.portalUrl + "rink/" + sessionStorage.getItem('personal_rink_id'), this.authHeaders.headers);
  }

  // dashboard

  public getRinkShareCount(): Observable<any>{
    return this.http.get(this.portalUrl + "dashboard/rink-share-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getRinkShareAnnotate(): Observable<any>{
    return this.http.get(this.portalUrl + "dashboard/rink-share-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

}
