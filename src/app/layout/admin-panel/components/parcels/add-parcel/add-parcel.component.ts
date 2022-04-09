import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ParcelService } from 'src/app/core/services/parcel.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { Parcel } from 'src/app/models/parcel.model';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddParcelComponent implements OnInit {
  profileForm = this.fb.group({
    address: ['', [Validators.required]],
  });
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<AddParcelComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.parcelService
      .createParcel(form.value)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (res: Parcel) => {
          this.toasterService.popToaster('success', 'חבילה נוספה בהצלחה');
          // Passing parent component the result
          this.dialogRef.close(res);
        },
        (err) => {
          const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
          this.toasterService.popToaster('error', text);
          this.dialogRef.close();
        }
      );
  }

  // Form Getters
  get address() {
    return this.profileForm.get('address');
  }
}
