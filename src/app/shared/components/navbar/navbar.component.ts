import { Component, ElementRef, OnInit, HostListener } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { EventData } from 'src/app/models/event-data.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;
  private toggleButton: any;
  private nav: HTMLElement;
  public darkBlueColor = 'rgb(29, 28, 49)';

  constructor(
    private element: ElementRef,
    public userData: UserDataService,
    private eventBusService: EventBusService,
    private authService: AuthService,
    private toasterService: ToasterService,
    private tokenStorage: TokenStorageService
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
      this.nav.style.backgroundColor = this.darkBlueColor;
    } else {
      this.navbarClose();
      this.changeColor();
    }
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  changeColor() {
    if (window.pageYOffset >= 150) {
      this.nav.style.backgroundColor = this.darkBlueColor;
    } else {
      if (!this.navbarCollapsed) {
        return;
      }
      this.nav.style.backgroundColor = '';
    }
  }

  logout() {
    this.authService.logout(this.tokenStorage.getRefreshToken()).subscribe(
      (res) => {
        this.eventBusService.emit(new EventData('logout', null));
      },
      (err) => {
        this.toasterService.popToaster(
          'error',
          'משהו השתבש בפעולת התנתקות, נסה שנית'
        );
      }
    );
  }
}
