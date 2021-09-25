import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Parcel } from 'src/app/models/parcel.model';
import { Volunteer } from 'src/app/models/volunteer.model';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { ParcelService } from 'src/app/services/parcel.service';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss'],
})
export class ParcelsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    {
      columnDef: 'arrived',
      header: 'Arrived',
      cell: (element: Parcel) => element,
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (element: Parcel) => `${element.address}`,
    },
    {
      columnDef: 'driver',
      header: 'Driver',
      cell: (element: Parcel) => element,
    },
    {
      columnDef: 'edit',
      header: 'Edit',
      cell: (element: Parcel) => element,
    },
    {
      columnDef: 'delete',
      header: '',
      cell: (element: Parcel) => element,
    },
  ];
  dataSource;
  drivers: Volunteer[];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private volunteerService: VolunteerService,
    private parcelService: ParcelService
  ) {}

  ngOnInit(): void {
    this.parcelService.getParcels().subscribe((parcels: Parcel[]) => {
      this.dataSource = new MatTableDataSource(parcels);
      this.dataSource.sort = this.sort;
    });
    this.volunteerService
      .getVolunteers()
      .subscribe((volunteers: Volunteer[]) => {
        this.drivers = volunteers;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compareByID(a: Volunteer, b: Volunteer) {
    return a && b && a._id === b._id;
  }

  editParcelDriver(parcel: Parcel, event: MatSelectChange) {
    const parcelClone: Parcel = JSON.parse(JSON.stringify(parcel));
    parcelClone.volunteer = event.value;
    this.parcelService.editParcel(parcelClone).subscribe((res: Parcel) => {
      console.log(res);
      parcel.volunteer = event.value;
      const text = `${res.volunteer.full_name} set as driver`;
      Swal.fire({
        text: text,
        timer: 300000,
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
      });
    });
  }

  editParcelArrived(parcel: Parcel, event: MatCheckboxChange) {
    const parcelClone: Parcel = JSON.parse(JSON.stringify(parcel));
    parcelClone.arrived = event.checked;
    this.parcelService.editParcel(parcelClone).subscribe((res: Parcel) => {
      parcel.arrived = event.checked;
      const text = event.checked ? `Arrived checked` : 'Arrived unchecked';
      Swal.fire({
        title: 'Success',
        text: text,
        timer: 300000,
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
      });
    });
  }
}
