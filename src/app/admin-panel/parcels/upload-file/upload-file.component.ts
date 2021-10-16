import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ParcelService } from 'src/app/services/parcel.service';
import Swal from 'sweetalert2';

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
          Swal.fire({
            text: 'חבילות נוספו בהצלחה',
            timer: 5000,
            icon: 'success',
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            background: '#1d1c31',
          });
          // Passing parent component the result
          this.dialogRef.close(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
