import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from './services/event-bus.service';
import { TokenStorageService } from './services/token-storage.service';
import { UserDataService } from './services/user-data.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Final';

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
