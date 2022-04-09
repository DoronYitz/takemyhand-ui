import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ParcelService } from 'src/app/core/services/parcel.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UploadFileComponent implements OnInit {
  textFile: File | null = null;
  loading: boolean = false;

  constructor(
    private parcelService: ParcelService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<UploadFileComponent>
  ) {}

  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    this.textFile = files.item(0);
  }

  uploadFileToActivity() {
    if (!this.textFile) {
      return;
    }
    this.loading = true;
    this.parcelService
      .createParcelsFromTextFile(this.textFile)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.toasterService.popToaster('success', 'חבילות נוספו בהצלחה');
          // Passing parent component the result
          this.dialogRef.close(data);
        },
        (err) => {
          const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
          this.toasterService.popToaster('error', text);
          this.dialogRef.close();
        }
      );
  }
}
