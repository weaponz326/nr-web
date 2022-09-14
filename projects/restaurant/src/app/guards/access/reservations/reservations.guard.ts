import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationsGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let reservationsAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).reservations_access;

    if (reservationsAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let reservationsAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).reservations_access;

    if (reservationsAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
