import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';
import { Payload } from '../models/payload.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      // // this will be passed from the route config
      // // on the data property
      // const expectedRole = route.data.expectedRole;
      // const token = localStorage.getItem('token');
      // // decode the token to get its payload
      // const tokenPayload: Payload = jwtDecode(token);
      // if (
      //   !this.authService.isAuthenticated() ||
      //   tokenPayload.role !== expectedRole
      // ) {
      //   this.router.navigate(['/login']);
      //   return false;
      // }
      return true;
    } catch (err) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
