import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { IEvent } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss'],
})
export class DeleteEventComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<DeleteEventComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedEvent: IEvent
  ) {}

  ngOnInit(): void {}

  deleteEvent() {
    this.eventService.deleteEvent(this.selectedEvent).subscribe(
      (res) => {
        this.toasterService.popToaster(
          'success',
          `${this.selectedEvent.title} נמחק בהצלחה`
        );

        this.dialogRef.close('success');
      },
      (err) => {
        const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
        this.toasterService.popToaster('error', text);
        this.dialogRef.close();
      }
    );
  }
}
