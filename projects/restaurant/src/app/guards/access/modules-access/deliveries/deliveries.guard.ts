import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeliveriesGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let deliveriesAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).deliveries_access;

    if (deliveriesAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let deliveriesAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).deliveries_access;

    if (deliveriesAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
