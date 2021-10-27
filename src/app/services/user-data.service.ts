import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) {
    this.onChange();
  }

  onChange() {
    this.isLoggedIn = !!this.tokenStorageService.getUser();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      const roles = user.roles;

      this.showAdminBoard = roles.includes('admin');
      this.showModeratorBoard = roles.includes('driver');
      this.username = user.username;
    }
  }
}
