import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import * as AOS from 'aos';

import { EventBusService } from './core/services/event-bus.service';
import { TokenStorageService } from './core/services/token-storage.service';
import { UserDataService } from './core/services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventBusSub?: Subscription;

  constructor(
    private tokenStorageService: TokenStorageService,
    private eventBusService: EventBusService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.userDataService.isLoggedIn = false;
    this.userDataService.roles = [];
    this.userDataService.showAdminBoard = false;
    this.userDataService.showModeratorBoard = false;
    this.userDataService.username = '';
    window.location.reload();
  }
}
