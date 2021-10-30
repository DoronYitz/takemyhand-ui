import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { ParcelService } from 'src/app/services/parcel.service';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { MessageService } from 'src/app/services/message.service';
import { IMessage } from 'src/app/models/message.model';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AlgoDialogComponent } from './algo-dialog/algo-dialog.component';
import { FinishEventComponent } from './finish-event/finish-event.component';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  columns = [
    {
      columnDef: 'arrived',
      header: 'סימן',
      cell: (element: IMessage) => element.arrived,
    },
    {
      columnDef: 'date',
      header: 'זמן',
      cell: (element: IMessage) => `${moment(element.date).format('HH:MM')}`,
    },
    {
      columnDef: 'text',
      header: 'תוכן',
      cell: (element: IMessage) => `${element.content}`,
    },
  ];
  messages: IMessage[] = [];
  dataSource;
  displayedColumns = this.columns.map((c) => c.columnDef);

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: 'white',
      },
    },
  };
  public pieChartLabels: Label[] = [["Hasn't", 'Arrived', 'Yet'], ['Arrived']];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartColors: any[] = [
    {
      backgroundColor: ['rgba(255,99,132,0.8)', 'rgba(54,162,235,0.8)'],
    },
  ];
  public observable: Observable<any>;

  constructor(
    private socket: Socket,
    private parcelService: ParcelService,
    private messageService: MessageService,
    private alertDialog: MatDialog
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((messages: IMessage[]) => {
      this.messages = messages;
      this.dataSource = new MatTableDataSource(this.messages);
    });
    this.getParcels();
    this.socket.fromEvent('message').subscribe((message: IMessage) => {
      this.messages.unshift(message);
      Swal.fire({
        text: message.content,
        timer: 5000,
        icon: message.arrived ? 'success' : 'warning',
        toast: true,
        position: 'bottom-left',
        showConfirmButton: false,
        background: '#1d1c31',
      });
      this.dataSource = new MatTableDataSource(this.messages);
      this.getParcels();
    });
  }

  getParcels() {
    let arrived: number, notarrived: number;
    this.parcelService.getParcels().subscribe((res) => {
      arrived = res.filter((x) => x.arrived).length;
      notarrived = res.filter((x) => !x.arrived).length;
      this.pieChartData = [notarrived, arrived];
    });
  }

  popAlertModal() {
    this.alertDialog.open(AlgoDialogComponent, {
      closeOnNavigation: false,
    });
  }

  popDeleteEventDataModal() {
    this.alertDialog.open(FinishEventComponent, {
      closeOnNavigation: false,
    });
  }
}
