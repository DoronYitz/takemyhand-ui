import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { IEvent } from 'src/app/models/event.model';
import { VolunteerService } from 'src/app/services/volunteer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVolunteerComponent implements OnInit {
  profileForm = this.fb.group({
    full_name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    address: ['', [Validators.required]],
    num_of_people: [1],
  });
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private dialogRef: MatDialogRef<AddVolunteerComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.volunteerService
      .createVolunteer(form.value)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (res: IEvent) => {
          Swal.fire({
            text: 'מתנדב נוסף בהצלחה',
            timer: 3000,
            icon: 'success',
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            background: '#1d1c31',
          });

          // Passing parent component the result
          this.dialogRef.close(res);
        },
        (err) => {
          const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
          Swal.fire({
            text: text,
            timer: 3000,
            icon: 'error',
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            background: '#1d1c31',
          });
          this.dialogRef.close();
        }
      );
  }

  // Form Getters
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
