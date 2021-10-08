import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Volunteer } from 'src/app/models/volunteer.model';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import Swal from 'sweetalert2';

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
      columnDef: 'driver',
      header: 'נהג',
      cell: (element: Volunteer) => element,
    },
  ];
  dataSource;
  totalVolunteers: number = 0;
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(private volunteerService: VolunteerService) {}

  ngOnInit(): void {
    this.volunteerService
      .getVolunteers()
      .subscribe((volunteers: Volunteer[]) => {
        const total = volunteers.reduce((acc: number, vulenteer) => {
          return vulenteer.num_of_people + acc;
        }, 0);
        this.totalVolunteers = total;
        this.dataSource = new MatTableDataSource(volunteers);
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
    this.volunteerService
      .editVolunteer(volunteerClone)
      .subscribe((res: Volunteer) => {
        volunteer.driver = event.checked;
        const text = event.checked
          ? 'Volunteer added as driver'
          : 'Volunteer removed from drivers';
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
