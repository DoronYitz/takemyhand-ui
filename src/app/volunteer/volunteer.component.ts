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

  profileForm = this.fb.group({
    full_name: [
      '',
      [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')],
    ],
    phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    address: ['', [Validators.required]],
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
          text: `${newVolunteer.full_name}, Thanks for joining us`,
          timer: 5000,
          icon: 'success',
          toast: true,
          position: 'bottom-right',
          showConfirmButton: false,
          background: '#1d1c31',
        });
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMsg = err?.error?.message;
        if (!this.errorMsg) {
          this.errorMsg = 'Something went wrong';
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
