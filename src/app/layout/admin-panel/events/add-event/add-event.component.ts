import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { tap } from 'rxjs/operators';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEventComponent implements OnInit {
  private strongSecretRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{9,9}$'
  );
  public loading: boolean = false;

  profileForm = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    date: ['', [Validators.required]],
    secret: [
      '',
      [Validators.required, Validators.pattern(this.strongSecretRegex)],
    ],
    description: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<AddEventComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.eventService
      .createEvent(form.value)
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (res: IEvent) => {
          this.toasterService.popToaster('success', 'אירוע נוסף בהצלחה');
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
  get secret() {
    return this.profileForm.get('secret');
  }

  get title() {
    return this.profileForm.get('title');
  }

  get description() {
    return this.profileForm.get('description');
  }

  get date() {
    return this.profileForm.get('date');
  }

  get category() {
    return this.profileForm.get('category');
  }
}
