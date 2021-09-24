import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Parcel } from 'src/app/models/parcel.model';
import { Volunteer } from 'src/app/models/volunteer.model';

const ELEMENT_DATA: Parcel[] = [
  {
    _id: '32j1k312j3',
    volunteer: { full_name: 'kelwqlekwq', _id: 'J' },
    address: '1.007989',
    arrived: false,
  },
  {
    _id: '32j1k312j3',
    volunteer: { full_name: 'kelwqlekwq', _id: 'J' },
    address: '4.0026',
    arrived: false,
  },
  {
    _id: '32j1k312j3',
    volunteer: { full_name: 'kelwqlekwq', _id: 'J' },
    address: '6.941',
    arrived: true,
  },
  {
    _id: '32j1k312j3',
    volunteer: { full_name: 'doronzzzzz', _id: 'N' },
    address: '9',
    arrived: false,
  },
  {
    _id: '32j1k312j3',
    volunteer: { full_name: 'kelwqlekwq', _id: 'J' },
    address: '10.811',
    arrived: true,
  },
];

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss'],
})
export class ParcelsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    {
      columnDef: '_id',
      header: 'Id',
      cell: (element: Parcel) => `${element._id}`,
    },
    {
      columnDef: 'driver_id',
      header: 'Driver',
      cell: (element: Parcel) => element.volunteer,
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (element: Parcel) => `${element.address}`,
    },
    {
      columnDef: 'arrived',
      header: 'Arrived',
      cell: (element: Parcel) => element.arrived,
    },
  ];
  dataSource;
  drivers: Volunteer[] = [
    { full_name: 'kelwqlekwq', _id: 'J' },
    { full_name: 'doronzzzzz', _id: 'N' },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
