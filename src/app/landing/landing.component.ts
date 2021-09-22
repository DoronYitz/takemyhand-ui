import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  tryme() {
    this.userService
      .createUser({ email: 'lolz@gmail.com', password: '32132131' })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
