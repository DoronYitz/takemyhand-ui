import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-text',
  templateUrl: './about-text.component.html',
  styleUrls: ['./about-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutTextComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
