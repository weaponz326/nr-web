import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RosterGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let rosterAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).roster_access;

    if (rosterAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let rosterAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).roster_access;

    if (rosterAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
