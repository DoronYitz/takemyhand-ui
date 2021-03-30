import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private navCollapse: any;
  sidebarVisible: boolean;
  isScrolled = false;

  constructor(public location: Location, private element: ElementRef) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navTrigger')[0];
    this.navCollapse = navbar.getElementsByClassName('navbar-collapse')[0];
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const navCollapse = this.navCollapse;
    setTimeout(function () {
      toggleButton.classList.add('active');
      navCollapse.classList.add('collapse');
    }, 500);
    this.sidebarVisible = true;
  }
  sidebarClose() {
    this.toggleButton.classList.remove('active');
    this.navCollapse.classList.remove('collapse');
    this.sidebarVisible = false;
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}
