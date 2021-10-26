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
      // this will be passed from the route config
      const expectedRole: string = route.data.expectedRole;
      const user = this.tokenStorage.getUser();
      if (!this.tokenStorage.getToken() || !user.roles.includes(expectedRole)) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } catch (err) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
