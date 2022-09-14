import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KitchenStockGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let kitchenStockAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).kitchen_stock_access;

    if (kitchenStockAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let kitchenStockAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).kitchen_stock_access;

    if (kitchenStockAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
