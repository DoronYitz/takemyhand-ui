import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Parcel } from '../models/parcel.model';
import { Volunteer } from '../models/volunteer.model';
import { ParcelService } from '../services/parcel.service';
import { VolunteerService } from '../services/volunteer.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    {
      columnDef: 'arrived',
      header: 'הגיע',
      cell: (element: Parcel) => element,
    },
    {
      columnDef: 'address',
      header: 'כתובת',
      cell: (element: Parcel) => `${element.address}`,
    },
    {
      columnDef: 'waze',
      header: 'נווט',
      cell: (element: Parcel) =>
        `https://waze.com/ul?q=${encodeURI(element.address)}&navigate=yes`,
    },
  ];
  parcels: Parcel[] = [];
  dataSource;
  drivers: Volunteer[];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private volunteerService: VolunteerService,
    private parcelService: ParcelService
  ) {}

  ngOnInit(): void {
    this.parcelService.getDriverParcels().subscribe((parcels: Parcel[]) => {
      this.parcels = parcels;
      this.dataSource = new MatTableDataSource(this.parcels);
      this.dataSource.sort = this.sort;
    });
  }

  compareByID(a: Volunteer, b: Volunteer) {
    return a && b && a._id === b._id;
  }

  editParcelArrived(parcel: Parcel, event: MatCheckboxChange) {
    const parcelClone: Parcel = JSON.parse(JSON.stringify(parcel));
    parcelClone.arrived = event.checked;
    this.parcelService.editParcelStatus(parcelClone).subscribe(
      (res: Parcel) => {
        parcel.arrived = event.checked;
        const text = event.checked ? `סומן כהגיע` : 'סומן כלא הגיע';
        Swal.fire({
          text: text,
          timer: 5000,
          icon: 'success',
          toast: true,
          position: 'bottom-left',
          showConfirmButton: false,
          background: '#1d1c31',
        });
      },
      (err) => {
        event.source.checked = !event.checked;
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
      }
    );
  }
}
