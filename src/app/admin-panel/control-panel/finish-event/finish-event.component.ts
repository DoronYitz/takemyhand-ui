import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finish-event',
  templateUrl: './finish-event.component.html',
  styleUrls: ['./finish-event.component.scss'],
})
export class FinishEventComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private dialogRef: MatDialogRef<FinishEventComponent>
  ) {}

  ngOnInit(): void {}

  deleteEventData() {
    this.eventService.deleteEventData().subscribe(
      (res) => {
        Swal.fire({
          text: `אירוע נגמר בהצלחה`,
          timer: 5000,
          icon: 'success',
          toast: true,
          position: 'bottom-left',
          showConfirmButton: false,
          background: '#1d1c31',
        });
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
}
