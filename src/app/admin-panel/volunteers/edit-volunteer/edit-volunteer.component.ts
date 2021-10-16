import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Volunteer } from 'src/app/models/volunteer.model';
import { VolunteerService } from 'src/app/services/volunteer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditVolunteerComponent implements OnInit {
  profileForm = this.fb.group({
    full_name: [this.selectedVolunteer.full_name, [Validators.required]],
    phone: [
      this.selectedVolunteer.phone,
      [Validators.required, Validators.pattern('^\\d{10}$')],
    ],
    address: [this.selectedVolunteer.address, [Validators.required]],
    num_of_people: [this.selectedVolunteer.num_of_people],
    driver: [this.selectedVolunteer.driver],
  });
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private dialogRef: MatDialogRef<EditVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedVolunteer: Volunteer
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.volunteerService
      .editVolunteer({ ...form.value, _id: this.selectedVolunteer._id })
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (res: Volunteer) => {
          Swal.fire({
            text: 'מתנדב נערך בהצלחה',
            timer: 5000,
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
            timer: 5000,
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
