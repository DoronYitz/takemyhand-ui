import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-finish-event',
  templateUrl: './finish-event.component.html',
  styleUrls: ['./finish-event.component.scss'],
})
export class FinishEventComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<FinishEventComponent>
  ) {}

  ngOnInit(): void {}

  deleteEventData() {
    this.eventService.deleteEventData().subscribe(
      (res) => {
        this.toasterService.popToaster('success', `אירוע נגמר בהצלחה`);
        this.dialogRef.close(res);
      },
      (err) => {
        const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
        this.toasterService.popToaster('error', text);
        this.dialogRef.close();
      }
    );
  }
}
