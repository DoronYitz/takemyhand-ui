import { Component, OnInit } from '@angular/core';
import { IEvent } from '../models/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  date: Date = new Date();
  events: IEvent[] = [];
  imgsPath: Array<string> = [''];
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events: IEvent[]) => {
      if (events.length > 2) {
        events = events.slice(0, 2);
      }
      while (events.length < 2) {
        const dummyEvent: IEvent = {
          title: 'TBA',
          description:
            'בהמשך יתוכנו עוד אירועי חלוקת מזון ותרומה לקהילה, נשמח לראותכם באירועים אלו :)',
          category: 'TBA',
          date: new Date(),
        };
        events.push(dummyEvent);
      }
      this.events = events;
    });
  }
}
