import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/restaurant/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class MenuApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  menuUrl = environment.apiUrl + 'restaurant-modules/menu/';

  // menu group

  public getAccountMenuGroup(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.menuUrl + "menu-group?account=" + this.customCookie.getCookie('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postMenuGroup(group: any): Observable<any>{
    return this.http.post(this.menuUrl + "menu-group/", group, this.authHeaders.headers);
  }

  public getMenuGroup(): Observable<any>{
    return this.http.get(this.menuUrl + "menu-group/" + sessionStorage.getItem('restaurant_menu_group_id'), this.authHeaders.headers);
  }

  public putMenuGroup(item: any): Observable<any>{
    return this.http.put(this.menuUrl + "menu-group/" + sessionStorage.getItem('restaurant_menu_group_id'), item, this.authHeaders.headers);
  }

  public deleteMenuGroup(): Observable<any>{
    return this.http.delete(this.menuUrl + "menu-group/" + sessionStorage.getItem('restaurant_menu_group_id'), this.authHeaders.headers);
  }

  // menu items

  public getAccountMenuItem(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.menuUrl + "all-menu-item?account=" + this.customCookie.getCookie('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public getMenuGroupMenuItem(): Observable<any>{
    return this.http.get(this.menuUrl + "menu-item?menu_group=" + sessionStorage.getItem('restaurant_menu_group_id'), this.authHeaders.headers);
  }

  public postMenuItem(item: any): Observable<any>{
    return this.http.post(this.menuUrl + "menu-item/", item, this.authHeaders.headers);
  }

  public getMenuItem(): Observable<any>{
    return this.http.get(this.menuUrl + "menu-item/" + sessionStorage.getItem('restaurant_menu_item_id'), this.authHeaders.headers);
  }

  public putMenuItem(id: any, data: any): Observable<any>{
    return this.http.put(this.menuUrl + "menu-item/" + id, data, this.authHeaders.headers);
  }

  public deleteMenuItem(id: any): Observable<any>{
    return this.http.delete(this.menuUrl + "menu-item/" + id, this.authHeaders.headers);
  }

  public putMenuItemImage(id: string, image: File) {
    let formParams = new FormData();
    formParams.append('image', image);
    formParams.append('menu_group', sessionStorage.getItem('restaurant_menu_group_id') as string);
    return this.http.put(this.menuUrl + "menu-item/" + id, formParams, this.authHeaders.headers)
  }

  // config

  public getMenuItemCodeConfig(): Observable<any>{
    return this.http.get(this.menuUrl + "config/menu-item-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public putMenuItemCodeConfig(data: any): Observable<any>{
    return this.http.put(this.menuUrl + "config/menu-item-code/" + this.customCookie.getCookie('restaurant_id'), data, this.authHeaders.headers);
  }

  public getNewMenuItemCodeConfig(): Observable<any>{
    return this.http.get(this.menuUrl + "config/new-menu-item-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  // dashboard

  public getMenuGroupCount(): Observable<any>{
    return this.http.get(this.menuUrl + "dashboard/menu-group-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public getMenuItemCount(): Observable<any>{
    return this.http.get(this.menuUrl + "dashboard/menu-item-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

}
