import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EventData } from '../models/eventData.model';
import { AuthService } from '../services/auth.service';
import { EventBusService } from '../services/event-bus.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;
  private toggleButton: any;
  private nav: HTMLElement;

  constructor(
    private element: ElementRef,
    public userData: UserDataService,
    private eventBusService: EventBusService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navTrigger')[0];
    this.nav = navbar.getElementsByTagName('nav')[0];
  }

  navbarOpen() {
    this.navbarCollapsed = !this.navbarCollapsed;
    this.toggleButton.classList.add('active');
  }

  navbarClose() {
    this.toggleButton.classList.remove('active');
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  sidebarToggle() {
    if (this.navbarCollapsed === true) {
      this.navbarOpen();
      this.nav.style.backgroundColor = 'rgb(29, 28, 49)';
    } else {
      this.navbarClose();
      this.changeColor();
    }
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  changeColor() {
    if (window.pageYOffset >= 150) {
      this.nav.style.backgroundColor = 'rgb(29, 28, 49)';
    } else {
      if (!this.navbarCollapsed) {
        return;
      }
      this.nav.style.backgroundColor = '';
    }
  }

  logout() {
    this.authService
      .logout(this.tokenStorage.getRefreshToken())
      .subscribe((res) => {
        this.eventBusService.emit(new EventData('logout', null));
      });
  }
}
