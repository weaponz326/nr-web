import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StaffApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // staff

  public getAccountStaff(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-staff/staff?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postStaff(staff: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-staff/staff/", staff);
  }

  public getStaff(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-staff/staff/" + sessionStorage.getItem('restaurant_staff_id'));
  }

  public putStaff(staff: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-staff/staff/" + sessionStorage.getItem('restaurant_staff_id'), staff);
  }

  public deleteStaff(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-staff/staff/" + sessionStorage.getItem('restaurant_staff_id'));
  }

  public putStaffPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', localStorage.getItem('restaurant_id') as string);
    return this.http.put(this.restaurantApi + "module-staff/staff/" + sessionStorage.getItem('restaurant_staff_id'), formParams)
  }

  // dashboard

  public getStaffCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-staff/dashboard/menu-staff-count?account=" + localStorage.getItem('restaurant_id'));
  }

}
