import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { IEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/core/services/event.service';

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
      secret: null,
      active: false,
    },
    {
      title: 'TBA',
      description:
        'בהמשך יתוכנו עוד אירועי חלוקת מזון ותרומה לקהילה, נשמח לראותכם באירועים אלו :)',
      category: 'TBA',
      date: new Date(),
      secret: null,
      active: false,
    },
  ];
  imgsPath: Array<string> = [''];
  constructor(
    private eventService: EventService,
    private renderer: Renderer2,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      (events: IEvent[]) => {
        events = events
          .filter((event) => {
            return new Date(event.date) > new Date();
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        const maxLen = events.length > 2 ? 2 : events.length;
        for (let i = 0; i < maxLen; i++) {
          this.events[i] = events[i];
        }
      },
      (err) => {
        this.toasterService.popToaster(
          'error',
          'משהו השתבש בעת טעינת העמוד, נסה שנית'
        );
      }
    );
  }

  public onIntersection(
    { target, visible }: { target: Element; visible: boolean },
    animation: string,
    delay_class: string = undefined
  ) {
    if (visible) {
      this.renderer.addClass(target, `animate__animated`);
      this.renderer.addClass(target, animation);
      if (delay_class) {
        this.renderer.addClass(target, delay_class);
      }
    }
  }
}
