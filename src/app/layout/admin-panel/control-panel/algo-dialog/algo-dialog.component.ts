import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ParcelService } from 'src/app/services/parcel.service';
@Component({
  selector: 'app-algo-dialog',
  templateUrl: './algo-dialog.component.html',
  styleUrls: ['./algo-dialog.component.scss'],
})
export class AlgoDialogComponent implements OnInit {
  constructor(
    private parcelService: ParcelService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<AlgoDialogComponent>
  ) {}

  ngOnInit(): void {}

  setDrivers() {
    this.parcelService.setDrivers().subscribe(
      (res) => {
        this.toasterService.popToaster('success', `נהגים נקבעו אוטומטית`);
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
