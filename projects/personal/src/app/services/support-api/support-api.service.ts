import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SupportApiService {

  constructor(private http: HttpClient) { }

  supportUrl = environment.apiUrl + 'support/support/';

  public postSupport(data: any): Observable<any>{
    return this.http.post(this.supportUrl, data);
  }
  
}
