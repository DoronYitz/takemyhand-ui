import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ParcelService } from 'src/app/core/services/parcel.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { Parcel } from 'src/app/models/parcel.model';

@Component({
  selector: 'app-edit-parcel',
  templateUrl: './edit-parcel.component.html',
  styleUrls: ['./edit-parcel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditParcelComponent implements OnInit {
  profileForm = this.fb.group({
    address: [this.selectedParcel.address, [Validators.required]],
  });
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public selectedParcel: Parcel,
    private dialogRef: MatDialogRef<EditParcelComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    let parcelClone = { ...this.selectedParcel };
    parcelClone.address = form.value.address;
    this.loading = true;
    this.parcelService
      .editParcel(parcelClone)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (res: Parcel) => {
          this.toasterService.popToaster('success', 'חבילה נערכה בהצלחה');
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
