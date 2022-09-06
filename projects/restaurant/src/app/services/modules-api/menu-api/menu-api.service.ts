import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenuApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // menu group

  public getAccountMenuGroup(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-menu/menu-group?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postMenuGroup(group: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-menu/menu-group/", group);
  }

  public getMenuGroup(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-menu/menu-group/" + sessionStorage.getItem('restaurant_menu_group_id'));
  }

  public putMenuGroup(item: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-menu/menu-group/" + sessionStorage.getItem('restaurant_menu_group_id'), item);
  }

  public deleteMenuGroup(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-menu/menu-group/" + sessionStorage.getItem('restaurant_menu_group_id'));
  }

  // menu items

  public getAccountMenuItem(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-menu/all-menu-item?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public getMenuGroupMenuItem(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-menu/menu-item?menu_group=" + sessionStorage.getItem('restaurant_menu_group_id'));
  }

  public postMenuItem(item: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-menu/menu-item/", item);
  }

  public getMenuItem(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-menu/menu-item/" + sessionStorage.getItem('restaurant_menu_item_id'));
  }

  public putMenuItem(id: any, data: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-menu/menu-item/" + id, data);
  }

  public deleteMenuItem(id: any): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-menu/menu-item/" + id);
  }

  public putMenuItemImage(id: string, image: File) {
    let formParams = new FormData();
    formParams.append('image', image);
    formParams.append('menu_group', sessionStorage.getItem('restaurant_menu_group_id') as string);
    return this.http.put(this.restaurantApi + "module-menu/menu-item/" + id, formParams)
  }

}
