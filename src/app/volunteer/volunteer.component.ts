import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VolunteerService } from '../services/volunteer.service';

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
    num_of_people: [1],
  });

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.volunteerService.createVolunteer(form.value).subscribe(
      (newVolunteer) => {
        Swal.fire({
          text: `${newVolunteer.full_name}, תודה שהצטרפת אלינו`,
          timer: 5000,
          icon: 'success',
          toast: true,
          position: 'bottom-left',
          showConfirmButton: false,
          background: '#1d1c31',
        });
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

  plus() {
    const number = +this.profileForm.get('num_of_people');
    this.profileForm.setValue({ num_of_people: number + 1 });
  }
  minus() {
    const number = +this.profileForm.get('num_of_people');
    this.profileForm.setValue({ num_of_people: number - 1 });
  }
}
