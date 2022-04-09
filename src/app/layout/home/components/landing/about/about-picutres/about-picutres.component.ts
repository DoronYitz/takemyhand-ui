import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-picutres',
  templateUrl: './about-picutres.component.html',
  styleUrls: ['./about-picutres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPicutresComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
