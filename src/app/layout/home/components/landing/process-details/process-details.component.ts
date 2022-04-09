import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss']
})
export class ProcessDetailsComponent implements OnInit {
  @Input('desc') desc : string;
  @Input('icon') icon : string[];
  @Input('title') title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
