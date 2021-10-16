import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parcel } from 'src/app/models/parcel.model';
import { ParcelService } from 'src/app/services/parcel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-parcel',
  templateUrl: './delete-parcel.component.html',
  styleUrls: ['./delete-parcel.component.scss'],
})
export class DeleteParcelComponent implements OnInit {
  constructor(
    private parcelService: ParcelService,
    private dialogRef: MatDialogRef<DeleteParcelComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedParcel: Parcel
  ) {}

  ngOnInit(): void {}

  deleteParcel() {
    this.parcelService.deleteParcel(this.selectedParcel).subscribe(
      (res) => {
        Swal.fire({
          text: `החבילה נמחקה`,
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
