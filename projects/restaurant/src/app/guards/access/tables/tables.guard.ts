import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesGuard implements CanActivate, CanActivateChild {
  
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let tablesAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).tables_access;

    if (tablesAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let tablesAccess = JSON.parse(localStorage.getItem('restaurantUserAccess') as string).tables_access;

    if (tablesAccess){
      return true;
    }
    else{
      return false;
    }
  }

  
}
