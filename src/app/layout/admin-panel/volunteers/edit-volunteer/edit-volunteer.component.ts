import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { Volunteer } from 'src/app/models/volunteer.model';
import { VolunteerService } from 'src/app/services/volunteer.service';

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
    driver: [this.selectedVolunteer.driver],
  });
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService,
    private dialogRef: MatDialogRef<EditVolunteerComponent>,
    private toasterService: ToasterService,
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
          this.toasterService.popToaster('success', 'מתנדב נערך בהצלחה');
          // Passing parent component the result
          this.dialogRef.close(res);
        },
        (err) => {
          const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
          this.toasterService.popToaster('error', text);
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
