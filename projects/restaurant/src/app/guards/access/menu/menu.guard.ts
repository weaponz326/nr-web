import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let menuAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).menu_access;

    if (menuAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let menuAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).menu_access;

    if (menuAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
