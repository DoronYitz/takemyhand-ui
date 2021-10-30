import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ParcelService } from 'src/app/services/parcel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-algo-dialog',
  templateUrl: './algo-dialog.component.html',
  styleUrls: ['./algo-dialog.component.scss'],
})
export class AlgoDialogComponent implements OnInit {
  constructor(
    private parcelService: ParcelService,
    private dialogRef: MatDialogRef<AlgoDialogComponent>
  ) {}

  ngOnInit(): void {}

  setDrivers() {
    this.parcelService.setDrivers().subscribe(
      (res) => {
        Swal.fire({
          text: `נהגים נקבעו אוטומטית`,
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
