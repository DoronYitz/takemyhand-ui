import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Parcel } from 'src/app/models/parcel.model';
import { ParcelService } from 'src/app/services/parcel.service';
import Swal from 'sweetalert2';

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
          Swal.fire({
            text: 'חבילה נוספה בהצלחה',
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
