import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;
  private toggleButton: any;
  private navCollapse: any;
  private nav: HTMLElement;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navTrigger')[0];
    this.nav = navbar.getElementsByTagName('nav')[0];
  }
  sidebarOpen() {
    this.navbarCollapsed = !this.navbarCollapsed;
    this.toggleButton.classList.add('active');
  }
  sidebarClose() {
    this.toggleButton.classList.remove('active');
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  sidebarToggle() {
    if (this.navbarCollapsed === true) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}
