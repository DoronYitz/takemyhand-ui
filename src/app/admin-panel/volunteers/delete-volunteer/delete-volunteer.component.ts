import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Volunteer } from 'src/app/models/volunteer.model';
import { VolunteerService } from 'src/app/services/volunteer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-volunteer',
  templateUrl: './delete-volunteer.component.html',
  styleUrls: ['./delete-volunteer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteVolunteerComponent implements OnInit {
  constructor(
    private volunteerService: VolunteerService,
    private dialogRef: MatDialogRef<DeleteVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedVolunteer: Volunteer
  ) {}

  ngOnInit(): void {}

  deleteVolunteer() {
    this.volunteerService.deleteVolunteer(this.selectedVolunteer).subscribe(
      (res) => {
        Swal.fire({
          text: `${this.selectedVolunteer.full_name} נמחק בהצלחה`,
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
