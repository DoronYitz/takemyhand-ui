import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IEvent } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent implements OnInit {
  @Input('event') event: IEvent;
  @Input('index') index: number;

  constructor() {}

  ngOnInit(): void {}
}
