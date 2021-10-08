import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UploadFileComponent implements OnInit {
  textFile: File | null = null;

  constructor(private parcelService: ParcelService) {}

  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    this.textFile = files.item(0);
  }

  uploadFileToActivity() {
    if (!this.textFile) {
      return;
    }
    this.parcelService.createParcelsFromTextFile(this.textFile).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
