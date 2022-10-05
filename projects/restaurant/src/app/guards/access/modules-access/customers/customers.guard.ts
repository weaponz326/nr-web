import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomersGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let customersAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).customers_access;

    if (customersAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let customersAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).customers_access;

    if (customersAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
