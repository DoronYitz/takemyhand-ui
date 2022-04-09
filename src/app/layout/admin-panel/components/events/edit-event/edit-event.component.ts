import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/core/services/event.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditEventComponent implements OnInit {
  profileForm = this.fb.group({
    title: [this.selectedEvent.title, [Validators.required]],
    category: [this.selectedEvent.category, [Validators.required]],
    date: [this.selectedEvent.date, [Validators.required]],
    active: [this.selectedEvent.active],
    description: [this.selectedEvent.description, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedEvent: IEvent
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.eventService
      .editEvent({ ...form.value, _id: this.selectedEvent._id })
      .subscribe(
        (res: IEvent) => {
          this.toasterService.popToaster('success', 'אירוע נערך בהצלחה');
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
