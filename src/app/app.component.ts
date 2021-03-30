import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Final';
  navOpened = false;
  @ViewChild(NavbarComponent, { static: true }) navbar: NavbarComponent;

  constructor(private element: ElementRef) {}

  onNavOpen(collapsed: boolean) {
    var navbar: HTMLElement = this.element.nativeElement.children[0]
      .children[0];
    this.navOpened = collapsed;
    if (this.navOpened) {
      navbar.style.backgroundColor = 'rgb(29, 28, 49)';
    } else {
      if (window.pageYOffset >= 150) {
        navbar.style.backgroundColor = 'rgb(29, 28, 49)';
      } else {
        navbar.style.backgroundColor = '';
      }
    }
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    var navbar: HTMLElement = this.element.nativeElement.children[0]
      .children[0];
    if (window.pageYOffset >= 150) {
      navbar.style.backgroundColor = 'rgb(29, 28, 49)';
    } else {
      if (this.navOpened) {
        return;
      }
      navbar.style.backgroundColor = '';
    }
  }
}
