import {
  Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;
  private toggleButton: any;
  private nav: HTMLElement;

  constructor(private element: ElementRef) {}

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
}
