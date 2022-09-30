import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!localStorage.getItem('school_id') && sessionStorage.getItem('school_user_access_id')){
      return true;
    }
    else{
      this.router.navigateByUrl('/user');
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    if (!!localStorage.getItem('school_id') && sessionStorage.getItem('school_user_access_id')){
      return true;
    }
    else{
      this.router.navigateByUrl('/user');
      return false;
    }
  }

}
