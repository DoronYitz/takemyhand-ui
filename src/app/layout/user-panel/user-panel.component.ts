import { Component, OnInit, ViewChild } from '@angular/core';

// Angular material
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParcelService } from 'src/app/core/services/parcel.service';

import { ToasterService } from 'src/app/core/services/toaster.service';
import { Parcel } from 'src/app/models/parcel.model';
import { Volunteer } from 'src/app/models/volunteer.model';

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
    private parcelService: ParcelService,
    private toasterService: ToasterService
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
        this.toasterService.popToaster('success', text);
      },
      (err) => {
        event.source.checked = !event.checked;
        const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
        this.toasterService.popToaster('error', text);
      }
    );
  }
}
