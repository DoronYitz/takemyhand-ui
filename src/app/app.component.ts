import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Final';
  @ViewChild(NavbarComponent, { static: true }) navbar: NavbarComponent;

  constructor(private element: ElementRef) {}

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    var navbar: HTMLElement = this.element.nativeElement.children[0]
      .children[0];
    const number = window.scrollY;
    if (window.pageYOffset >= 150) {
      navbar.style.backgroundColor = 'rgb(21, 20, 43)';
    } else {
      navbar.style.backgroundColor = '';
    }
  }
}
