import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn =(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree=> {
    const router = inject(Router);
    const email=sessionStorage.getItem('email')
    if (email!=null) {
      return true; // Allow navigation to the dashboard
    } else {
      // Redirect to the login page or another route
      return router.createUrlTree(['/login']);
    }
  }

