import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToasterService } from 'src/app/core/services/toaster.service';
import { VolunteerService } from 'src/app/core/services/volunteer.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent implements OnInit {
  errorMsg: string;
  onlyLetters: RegExp = new RegExp('^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$');

  profileForm = this.fb.group({
    full_name: [
      '',
      [Validators.required, Validators.pattern(this.onlyLetters)],
    ],
    phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    address: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.volunteerService.createVolunteer(form.value).subscribe(
      (newVolunteer) => {
        this.toasterService.popToaster(
          'success',
          `${newVolunteer.full_name}, תודה שהצטרפת אלינו`
        );
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMsg = err?.error?.message;
        if (!this.errorMsg) {
          this.errorMsg = 'משהו השתבש, נסה שנית מאוחר יותר';
        }
      }
    );
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
