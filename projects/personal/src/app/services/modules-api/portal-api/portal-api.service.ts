import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class PortalApiService {
  getSearchDetail(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  personalUrl = environment.personalUrl;

  // rink

  public getAllRinks(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalUrl + "module-portal/rink-list?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getRink(): Observable<any>{
    return this.http.get(this.personalUrl + "module-portal/rink/" + sessionStorage.getItem('personal_rink_id'), this.authHeaders.headers);
  }

  public postRink(rink: any): Observable<any>{
    return this.http.post(this.personalUrl + "module-portal/rink/", rink, this.authHeaders.headers);
  }

  public putRink(rink: any): Observable<any>{
    return this.http.put(this.personalUrl + "module-portal/rink/" + sessionStorage.getItem('personal_rink_id'), rink, this.authHeaders.headers);
  }

  public deleteRink(): Observable<any>{
    return this.http.delete(this.personalUrl + "module-portal/rink/" + sessionStorage.getItem('personal_rink_id'), this.authHeaders.headers);
  }

}
