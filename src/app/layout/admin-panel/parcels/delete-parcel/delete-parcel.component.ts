import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { Parcel } from 'src/app/models/parcel.model';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-delete-parcel',
  templateUrl: './delete-parcel.component.html',
  styleUrls: ['./delete-parcel.component.scss'],
})
export class DeleteParcelComponent implements OnInit {
  constructor(
    private parcelService: ParcelService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<DeleteParcelComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedParcel: Parcel
  ) {}

  ngOnInit(): void {}

  deleteParcel() {
    this.parcelService.deleteParcel(this.selectedParcel).subscribe(
      (res) => {
        this.toasterService.popToaster('success', `החבילה נמחקה`);
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
