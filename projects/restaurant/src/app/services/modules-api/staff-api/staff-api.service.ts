import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class StaffApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  staffUrl = environment.apiUrl + 'restaurant-modules/staff/';

  // staff

  public getAccountStaff(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.staffUrl + "staff?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postStaff(staff: any): Observable<any>{
    return this.http.post(this.staffUrl + "staff/", staff, this.authHeaders.headers);
  }

  public getStaff(): Observable<any>{
    return this.http.get(this.staffUrl + "staff/" + sessionStorage.getItem('restaurant_staff_id'), this.authHeaders.headers);
  }

  public putStaff(staff: any): Observable<any>{
    return this.http.put(this.staffUrl + "staff/" + sessionStorage.getItem('restaurant_staff_id'), staff, this.authHeaders.headers);
  }

  public deleteStaff(): Observable<any>{
    return this.http.delete(this.staffUrl + "staff/" + sessionStorage.getItem('restaurant_staff_id'), this.authHeaders.headers);
  }

  public putStaffPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', localStorage.getItem('restaurant_id') as string);
    return this.http.put(this.staffUrl + "staff/" + sessionStorage.getItem('restaurant_staff_id'), formParams, this.authHeaders.headers)
  }

  // dashboard

  public getStaffCount(): Observable<any>{
    return this.http.get(this.staffUrl + "dashboard/staff-count?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

}
