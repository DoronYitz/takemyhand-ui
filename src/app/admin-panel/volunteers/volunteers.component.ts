import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Volunteer } from 'src/app/models/volunteer.model';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { IEvent } from 'src/app/models/event.model';
import { EditVolunteerComponent } from './edit-volunteer/edit-volunteer.component';
import { DeleteVolunteerComponent } from './delete-volunteer/delete-volunteer.component';
import { AddVolunteerComponent } from './add-volunteer/add-volunteer.component';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss'],
})
export class VolunteersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  columns = [
    {
      columnDef: 'full_name',
      header: 'שם מלא',
      cell: (element: Volunteer) => `${element.full_name}`,
    },
    {
      columnDef: 'phone',
      header: 'פלאפון',
      cell: (element: Volunteer) => `${element.phone}`,
    },
    {
      columnDef: 'num_of_people',
      header: `מס' אנשים`,
      cell: (element: Volunteer) => `${element.num_of_people}`,
    },
    {
      columnDef: 'address',
      header: `כתובת`,
      cell: (element: Volunteer) => `${element.address}`,
    },
    {
      columnDef: 'driver',
      header: 'נהג',
      cell: (element: Volunteer) => element,
    },
    {
      columnDef: 'edit',
      header: 'עריכה',
      cell: (element: Volunteer) => element,
    },
    {
      columnDef: 'delete',
      header: 'מחק',
      cell: (element: Volunteer) => element,
    },
  ];
  dataSource;
  volunteers: Volunteer[] = [];
  totalVolunteers: number = 0;
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private volunteerService: VolunteerService,
    private editVolunteerDialog: MatDialog,
    private deleteVolunteerDialog: MatDialog,
    private addVolunteerDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.volunteerService
      .getVolunteers()
      .subscribe((volunteers: Volunteer[]) => {
        const total = volunteers.reduce((acc: number, vulenteer) => {
          return vulenteer.num_of_people + acc;
        }, 0);
        this.volunteers = volunteers;
        this.totalVolunteers = total;
        this.dataSource = new MatTableDataSource(this.volunteers);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compareByID(a: Volunteer, b: Volunteer) {
    return a && b && a._id === b._id;
  }

  toggleVolunteerDriver(volunteer: Volunteer, event: MatCheckboxChange) {
    const volunteerClone: Volunteer = JSON.parse(JSON.stringify(volunteer));
    volunteerClone.driver = event.checked;
    this.volunteerService.editVolunteer(volunteerClone).subscribe(
      (res: Volunteer) => {
        volunteer.driver = event.checked;
        const text = event.checked
          ? `מתנדב הוגדר כנהג`
          : `מתנדב הוסר מרשימת הנהגים`;
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

  popAddVolunteerModal() {
    const addDialogRef = this.addVolunteerDialog.open(AddVolunteerComponent, {
      panelClass: 'add-modal',
    });
    addDialogRef.afterClosed().subscribe((newVolunteer: IEvent) => {
      if (!newVolunteer) {
        return;
      }
      this.volunteers.push(newVolunteer);
      this.dataSource = new MatTableDataSource(this.volunteers);
      this.dataSource.sort = this.sort;
    });
  }

  popEditVolunteerModal(selectedVolunteer: Volunteer) {
    const editDialogRef = this.editVolunteerDialog.open(
      EditVolunteerComponent,
      {
        data: selectedVolunteer,
        panelClass: 'edit-modal',
      }
    );
    editDialogRef.afterClosed().subscribe((edittedVolunteer: Volunteer) => {
      if (!edittedVolunteer) {
        return;
      }
      this.volunteers = this.volunteers.map((x) =>
        x._id !== edittedVolunteer._id ? x : edittedVolunteer
      );
      this.dataSource = new MatTableDataSource(this.volunteers);
      this.dataSource.sort = this.sort;
    });
  }

  popDeleteVolunteerModal(selectedVolunteer: IEvent) {
    const deleteDialogRef = this.deleteVolunteerDialog.open(
      DeleteVolunteerComponent,
      {
        data: selectedVolunteer,
        panelClass: 'delete-modal',
      }
    );
    deleteDialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      const eventIndex = this.volunteers.indexOf(selectedVolunteer);
      this.volunteers.splice(eventIndex, 1);
      this.dataSource = new MatTableDataSource(this.volunteers);
      this.dataSource.sort = this.sort;
    });
  }
}
