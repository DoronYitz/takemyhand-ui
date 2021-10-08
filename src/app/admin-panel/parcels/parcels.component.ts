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
import { MatDialog } from '@angular/material/dialog';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DeleteParcelComponent } from './delete-parcel/delete-parcel.component';
import { AddParcelComponent } from './add-parcel/add-parcel.component';
import { EditParcelComponent } from './edit-parcel/edit-parcel.component';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss'],
})
export class ParcelsComponent implements OnInit {
  public editState = false;
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
    {
      columnDef: 'driver',
      header: 'נהג',
      cell: (element: Parcel) => element,
    },
    {
      columnDef: 'edit',
      header: 'עריכה',
      cell: (element: Parcel) => element,
    },
    {
      columnDef: 'delete',
      header: 'מחק',
      cell: (element: Parcel) => element,
    },
  ];
  parcels: Parcel[] = [];
  dataSource;
  drivers: Volunteer[];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private volunteerService: VolunteerService,
    private parcelService: ParcelService,
    private uploadFileDialog: MatDialog,
    private deleteParcelDialog: MatDialog,
    private addParcelDialog: MatDialog,
    private editParcelDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.parcelService.getParcels().subscribe((parcels: Parcel[]) => {
      this.parcels = parcels;
      this.dataSource = new MatTableDataSource(this.parcels);
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
      parcel.volunteer = event.value;
      const text = `${parcel.volunteer.full_name} set as driver`;
      Swal.fire({
        text: text,
        timer: 300000,
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        background: '#1d1c31',
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
        text: text,
        timer: 300000,
        icon: 'success',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        background: '#1d1c31',
      });
    });
  }

  popLoadFileModal() {
    const uploadDialogRef = this.uploadFileDialog.open(UploadFileComponent, {
      closeOnNavigation: false,
    });
  }

  popAddParcelModal() {
    const addDialog = this.addParcelDialog.open(AddParcelComponent, {
      disableClose: true,
      panelClass: 'add-modal',
    });
    addDialog.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.parcels.push(res);
      this.dataSource = new MatTableDataSource(this.parcels);
      this.dataSource.sort = this.sort;
    });
  }

  popEditParcelModal(selectedParcel: Parcel) {
    const editDialog = this.editParcelDialog.open(EditParcelComponent, {
      closeOnNavigation: false,
      data: selectedParcel,
      panelClass: 'edit-modal',
    });
    editDialog.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      let prevParcel = this.parcels.find((x) => x._id === res._id);
      prevParcel = res;
      this.dataSource = new MatTableDataSource(this.parcels);
      this.dataSource.sort = this.sort;
    });
  }

  popDeleteParcelModal(selectedParcel: Parcel) {
    const deleteDialogRef = this.deleteParcelDialog.open(
      DeleteParcelComponent,
      {
        closeOnNavigation: false,
        data: selectedParcel,
      }
    );
    deleteDialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      const parcelIndex = this.parcels.indexOf(selectedParcel);
      this.parcels.splice(parcelIndex, 1);
      this.dataSource = new MatTableDataSource(this.parcels);
      this.dataSource.sort = this.sort;
    });
  }
}
