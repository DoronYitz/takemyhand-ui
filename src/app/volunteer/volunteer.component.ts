import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent implements OnInit {
  nbhoods: String[] = ['Beit Eliezer', 'Ein Ayam', 'Shonat a Tikva'];

  profileForm = this.fb.group({
    full_name: [
      '',
      [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')],
    ],
    phone: ['', [Validators.required]],
    neighborhood: ['Ein Ayam', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {}

  get full_name() {
    return this.profileForm.get('full_name');
  }

  get phone() {
    return this.profileForm.get('phone');
  }
}
