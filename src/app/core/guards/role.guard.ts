import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

/**
 * Role guard
 * Checks data of exceptedRole, check user permissions according to excepected roleF
 */
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      // Passed from route config
      const expectedRole: string = route.data.expectedRole;
      // Getting user
      const user = this.tokenStorage.getUser();

      // Check if user roles include excepted role
      if (!user.roles.includes(expectedRole)) {
        this.router.navigate(['/']);
        return false;
      }

      // If does, allow to navigate
      return true;
    } catch (err) {
      this.router.navigate(['/']);
      return false;
    }
  }
}
