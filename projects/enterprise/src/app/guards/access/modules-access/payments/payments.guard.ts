import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentsGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let paymentsAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).payments_access;

    if (paymentsAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let paymentsAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).payments_access;

    if (paymentsAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
