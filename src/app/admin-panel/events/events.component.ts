import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Volunteer } from 'src/app/models/volunteer.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IEvent } from 'src/app/models/event.model';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { EventService } from 'src/app/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';

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
  events: IEvent[] = [];
  dataSource;
  drivers: Volunteer[];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private eventService: EventService,
    private addEventDialog: MatDialog,
    private editEventDialog: MatDialog,
    private deleteEventDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: IEvent[]) => {
      events.forEach((x) => {
        x.fixedDate = moment(x.date).format('DD/MM/YYYY');
      });
      this.events = events;
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  popAddEventModal() {
    const addDialogRef = this.addEventDialog.open(AddEventComponent, {
      panelClass: 'add-modal',
    });
    addDialogRef.afterClosed().subscribe((newEvent: IEvent) => {
      if (!newEvent) {
        return;
      }
      newEvent.fixedDate = moment(newEvent.date).format('DD/MM/YYYY');
      this.events.push(newEvent);
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.sort = this.sort;
    });
  }

  popEditEventModal(selectedEvent: IEvent) {
    const editDialogRef = this.editEventDialog.open(EditEventComponent, {
      data: selectedEvent,
      panelClass: 'edit-modal',
    });
    editDialogRef.afterClosed().subscribe((edittedEvent: IEvent) => {
      if (!edittedEvent) {
        return;
      }
      edittedEvent.fixedDate = moment(edittedEvent.date).format('DD/MM/YYYY');
      let prevEvent = this.events.find((x) => x._id === edittedEvent._id);
      prevEvent = edittedEvent;
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.sort = this.sort;
    });
  }

  popDeleteEventModal(selectedEvent: IEvent) {
    const deleteDialogRef = this.deleteEventDialog.open(DeleteEventComponent, {
      data: selectedEvent,
      panelClass: 'delete-modal',
    });
    deleteDialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      const eventIndex = this.events.indexOf(selectedEvent);
      this.events.splice(eventIndex, 1);
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.sort = this.sort;
    });
  }

  toggleEventActive(selecetedEvent: IEvent, event: MatCheckboxChange) {
    const eventClone: IEvent = JSON.parse(JSON.stringify(selecetedEvent));
    eventClone.active = event.checked;
    this.eventService.editEvent(eventClone).subscribe((res: IEvent) => {
      console.log(res);
      selecetedEvent.active = event.checked;
      const text = event.checked
        ? `${selecetedEvent.title} is active`
        : `${selecetedEvent.title} is not active`;
      Swal.fire({
        text: text,
        timer: 3000,
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        background: '#1d1c31',
      });
    });
  }
}
