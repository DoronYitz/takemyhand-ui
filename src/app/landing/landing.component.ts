import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private socket: Socket) {}

  ngOnInit() {}

  sendMessage() {
    this.socket.emit('message', { name: 'doron' });
  }
}
