import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelService,
    private dialogRef: MatDialogRef<AddParcelComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.parcelService.createParcel(form.value).subscribe((res: Parcel) => {
      Swal.fire({
        text: 'Parcel added successfully',
        timer: 3000,
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        background: '#1d1c31',
      });

      // Passing parent component the result
      this.dialogRef.close(res);
    });
  }

  // Form Getters
  get address() {
    return this.profileForm.get('address');
  }
}
