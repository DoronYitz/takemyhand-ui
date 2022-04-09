import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { IEvent } from 'src/app/models/event.model';
import { VolunteerService } from 'src/app/services/volunteer.service';

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
    private toasterService: ToasterService,
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
          this.toasterService.popToaster('success', 'מתנדב נוסף בהצלחה');
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
