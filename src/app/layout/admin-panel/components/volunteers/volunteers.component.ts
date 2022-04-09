import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Volunteer } from 'src/app/models/volunteer.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { EditVolunteerComponent } from './edit-volunteer/edit-volunteer.component';
import { DeleteVolunteerComponent } from './delete-volunteer/delete-volunteer.component';
import { AddVolunteerComponent } from './add-volunteer/add-volunteer.component';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { VolunteerService } from 'src/app/core/services/volunteer.service';

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
    private toasterService: ToasterService,
    private editVolunteerDialog: MatDialog,
    private deleteVolunteerDialog: MatDialog,
    private addVolunteerDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.volunteerService.getVolunteers().subscribe(
      (volunteers: Volunteer[]) => {
        this.volunteers = volunteers;
        this.totalVolunteers = volunteers.length;
        this.dataSource = new MatTableDataSource(this.volunteers);
        this.dataSource.sort = this.sort;
      },
      (err) => {
        const text = 'משהו השתבש בעת טעינת העמוד, נסה שנית';
        this.toasterService.popToaster('error', text);
      }
    );
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
        this.toasterService.popToaster('success', text);
      },
      (err) => {
        event.source.checked = !event.checked;
        const text = err.error.message || 'משהו השתבש, נסה מאוחר יותר';
        this.toasterService.popToaster('error', text);
      }
    );
  }

  popAddVolunteerModal() {
    const addDialogRef = this.addVolunteerDialog.open(AddVolunteerComponent, {
      panelClass: 'add-modal',
    });
    addDialogRef.afterClosed().subscribe((newVolunteer: Volunteer) => {
      if (!newVolunteer) {
        return;
      }
      this.volunteers.push(newVolunteer);
      this.totalVolunteers++;
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

  popDeleteVolunteerModal(selectedVolunteer: Volunteer) {
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
      const volunteerIndex = this.volunteers.indexOf(selectedVolunteer);
      this.volunteers.splice(volunteerIndex, 1);
      this.totalVolunteers--;
      this.dataSource = new MatTableDataSource(this.volunteers);
      this.dataSource.sort = this.sort;
    });
  }
}
