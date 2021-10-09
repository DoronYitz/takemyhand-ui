import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditEventComponent implements OnInit {
  private strongSecretRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
  );

  profileForm = this.fb.group({
    title: [this.selectedEvent.title, [Validators.required]],
    category: [this.selectedEvent.category, [Validators.required]],
    date: [this.selectedEvent.date, [Validators.required]],
    active: [this.selectedEvent.active],
    secret: [
      this.selectedEvent.secret,
      [Validators.required, Validators.pattern(this.strongSecretRegex)],
    ],
    description: [this.selectedEvent.description, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedEvent: IEvent
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.eventService
      .editEvent({ ...form.value, _id: this.selectedEvent._id })
      .subscribe((res: IEvent) => {
        Swal.fire({
          text: 'אירוע נערך בהצלחה',
          timer: 3000,
          icon: 'success',
          toast: true,
          position: 'bottom-left',
          showConfirmButton: false,
          background: '#1d1c31',
        });
        // Passing parent component the result
        this.dialogRef.close(res);
      });
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
