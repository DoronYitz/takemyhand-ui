import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent implements OnInit {
  nbhoods: String[] = ['Beit Eliezer', 'Ein Ayam', 'Shonat a Tikva'];
  hasLicense = false;
  constructor() {}

  ngOnInit(): void {}
}
