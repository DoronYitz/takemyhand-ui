import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';
import { EditEventComponent } from '../edit-event/edit-event.component';

@Component({
  selector: 'app-edit-secret-event',
  templateUrl: './edit-secret-event.component.html',
  styleUrls: ['./edit-secret-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditSecretEventComponent implements OnInit {
  private strongSecretRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
  );

  profileForm = this.fb.group({
    secret: [
      this.selectedEvent.secret,
      [Validators.required, Validators.pattern(this.strongSecretRegex)],
    ],
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
      .editEventSecret({ ...form.value, _id: this.selectedEvent._id })
      .subscribe((res: IEvent) => {
        Swal.fire({
          text: 'מפתח סודי של האירוע נקבע בהצלחה',
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
}
