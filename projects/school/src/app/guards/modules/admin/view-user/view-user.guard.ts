import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewUserGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!sessionStorage.getItem('school_account_user_id')){
      return true;
    }
    else{
      this.router.navigateByUrl('/home/admin');
      return false;
    }
  }

}
