import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Volunteer } from 'src/app/models/volunteer.model';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IEvent } from 'src/app/models/event.model';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { EventService } from 'src/app/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  public editState = false;
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    {
      columnDef: 'active',
      header: 'Active',
      cell: (element: IEvent) => element,
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: IEvent) => `${element.title}`,
    },
    {
      columnDef: 'category',
      header: 'Category',
      cell: (element: IEvent) => `${element.category}`,
    },
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: IEvent) => `${element.fixedDate}`,
    },
    {
      columnDef: 'edit',
      header: 'Edit',
      cell: (element: IEvent) => element,
    },
    {
      columnDef: 'delete',
      header: 'Delete',
      cell: (element: IEvent) => element,
    },
  ];
  dataSource;
  drivers: Volunteer[];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private eventService: EventService,
    private addEventDialog: MatDialog,
    private editEventDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: IEvent[]) => {
      console.log(events);
      events.forEach((x) => {
        x.fixedDate = moment(x.date).format('DD/MM/YYYY');
      });
      this.dataSource = new MatTableDataSource(events);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  popAddEventModal() {
    this.addEventDialog.open(AddEventComponent, { panelClass: 'add-modal' });
  }

  // editParcelDriver(parcel: IEvent, event: MatSelectChange) {
  //   const parcelClone: IEvent = JSON.parse(JSON.stringify(parcel));
  //   parcelClone.volunteer = event.value;
  //   this.parcelService.editParcel(parcelClone).subscribe((res: IEvent) => {
  //     console.log(res);
  //     parcel.volunteer = event.value;
  //     const text = `${res.volunteer.full_name} set as driver`;
  //     Swal.fire({
  //       text: text,
  //       timer: 300000,
  //       icon: 'success',
  //       toast: true,
  //       position: 'bottom-right',
  //       showConfirmButton: false,
  //       background: '#1d1c31',
  //     });
  //   });
  // }
}
