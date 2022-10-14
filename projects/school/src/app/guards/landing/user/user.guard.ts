import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!this.customCookie.getCookie('personal_id')){
      return true;
    }
    else{
      this.router.navigateByUrl('/guest');
      return false;
    }
  }
  
}
