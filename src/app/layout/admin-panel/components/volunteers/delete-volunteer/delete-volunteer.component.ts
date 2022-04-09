import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { VolunteerService } from 'src/app/core/services/volunteer.service';
import { Volunteer } from 'src/app/models/volunteer.model';

@Component({
  selector: 'app-delete-volunteer',
  templateUrl: './delete-volunteer.component.html',
  styleUrls: ['./delete-volunteer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteVolunteerComponent implements OnInit {
  constructor(
    private volunteerService: VolunteerService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<DeleteVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedVolunteer: Volunteer
  ) {}

  ngOnInit(): void {}

  deleteVolunteer() {
    this.volunteerService.deleteVolunteer(this.selectedVolunteer).subscribe(
      (res) => {
        this.toasterService.popToaster(
          'success',
          `${this.selectedVolunteer.full_name} נמחק בהצלחה`
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
