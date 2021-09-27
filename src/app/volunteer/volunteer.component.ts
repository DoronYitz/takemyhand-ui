import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VolunteerService } from '../services/volunteer.service';

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
    phone: ['', [Validators.required, Validators.pattern('@"^\\d{10}$"')]],
    address: ['Ein Ayam', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.volunteerService
      .createVolunteer(form.value)
      .subscribe((newVolunteer) => {});
  }

  get full_name() {
    return this.profileForm.get('full_name');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get address() {
    return this.profileForm.get('address');
  }
}
