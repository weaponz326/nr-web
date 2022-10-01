import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let adminAccess = JSON.parse(localStorage.getItem('schoolUserAccess') as string).admin_access;

    if (adminAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let adminAccess = JSON.parse(localStorage.getItem('schoolUserAccess') as string).admin_access;

    if (adminAccess){
      return true;
    }
    else{
      return false;
    }
  }

}
