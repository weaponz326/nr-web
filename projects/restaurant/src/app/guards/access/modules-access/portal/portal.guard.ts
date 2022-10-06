import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PortalGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let portalAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).portal_access;

    if (portalAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let portalAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).portal_access;

    if (portalAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
