import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IEvent } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  date: Date = new Date();
  events: IEvent[] = [
    {
      title: 'TBA',
      description:
        'בהמשך יתוכנו עוד אירועי חלוקת מזון ותרומה לקהילה, נשמח לראותכם באירועים אלו :)',
      category: 'TBA',
      date: new Date(),
    },
    {
      title: 'TBA',
      description:
        'בהמשך יתוכנו עוד אירועי חלוקת מזון ותרומה לקהילה, נשמח לראותכם באירועים אלו :)',
      category: 'TBA',
      date: new Date(),
    },
  ];
  imgsPath: Array<string> = [''];
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      (events: IEvent[]) => {
        const maxLen = events.length > 2 ? 2 : events.length;
        for (let i = 0; i < maxLen; i++) {
          this.events[i] = events[i];
        }
      },
      (err) => {
        Swal.fire({
          text: 'משהו השתבש בעת טעינת העמוד, נסה שנית',
          timer: 7000,
          icon: 'error',
          toast: true,
          position: 'bottom-left',
          showConfirmButton: false,
          background: '#1d1c31',
        });
      }
    );
  }
}
