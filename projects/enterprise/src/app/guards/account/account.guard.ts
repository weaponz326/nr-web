import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!this.customCookie.getCookie('restaurant_id') && sessionStorage.getItem('restaurant_user_access_id')){
      return true;
    }
    else{
      this.router.navigateByUrl('/user');
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    if (!!this.customCookie.getCookie('restaurant_id') && sessionStorage.getItem('restaurant_user_access_id')){
      return true;
    }
    else{
      this.router.navigateByUrl('/user');
      return false;
    }
  }

}
