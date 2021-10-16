import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss'],
})
export class DeleteEventComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private dialogRef: MatDialogRef<DeleteEventComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedEvent: IEvent
  ) {}

  ngOnInit(): void {}

  deleteEvent() {
    this.eventService.deleteEvent(this.selectedEvent).subscribe(
      (res) => {
        Swal.fire({
          text: `${this.selectedEvent.title} נמחק בהצלחה`,
          timer: 5000,
          icon: 'success',
          toast: true,
          position: 'bottom-left',
          showConfirmButton: false,
          background: '#1d1c31',
        });
        this.dialogRef.close('success');
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
}
