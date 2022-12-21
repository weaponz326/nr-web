import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewRinkGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!sessionStorage.getItem('enterprise_rink_id')){
      return true;
    }
    else{
      this.router.navigateByUrl('/home/portal');
      return false;
    }
  }

}
