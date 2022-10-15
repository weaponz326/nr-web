import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!this.customCookie.getCookie('token')){
      return true;
    }
    else{
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    if (!!this.customCookie.getCookie('token')){
      return true;
    }
    else{
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
  
}
