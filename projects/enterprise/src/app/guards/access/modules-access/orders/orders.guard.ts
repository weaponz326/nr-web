import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let ordersAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).orders_access;

    if (ordersAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let ordersAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).orders_access;

    if (ordersAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
