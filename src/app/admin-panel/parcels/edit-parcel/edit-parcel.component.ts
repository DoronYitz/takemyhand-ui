import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Parcel } from 'src/app/models/parcel.model';
import { ParcelService } from 'src/app/services/parcel.service';
import Swal from 'sweetalert2';

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
    @Inject(MAT_DIALOG_DATA) public selectedParcel: Parcel,
    private dialogRef: MatDialogRef<EditParcelComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    let parcelClone = { ...this.selectedParcel };
    parcelClone.address = form.value.address;
    this.loading = true;
    this.parcelService
      .editParcelAddress(parcelClone)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        (res: Parcel) => {
          Swal.fire({
            text: 'חבילה נערכה בהצלחה',
            timer: 5000,
            icon: 'success',
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            background: '#1d1c31',
          });
          // Passing parent component the result
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

  // Form Getters
  get address() {
    return this.profileForm.get('address');
  }
}
