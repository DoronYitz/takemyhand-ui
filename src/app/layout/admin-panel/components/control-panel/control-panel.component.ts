import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { MessageService } from 'src/app/layout/admin-panel/services/message.service';
import { Message } from 'src/app/models/message.model';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlgoDialogComponent } from './algo-dialog/algo-dialog.component';
import { FinishEventComponent } from './finish-event/finish-event.component';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ParcelService } from 'src/app/core/services/parcel.service';

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
      cell: (element: Message) => element.arrived,
    },
    {
      columnDef: 'date',
      header: 'זמן',
      cell: (element: Message) => `${moment(element.date).format('HH:MM')}`,
    },
    {
      columnDef: 'text',
      header: 'תוכן',
      cell: (element: Message) => `${element.content}`,
    },
  ];
  messages: Message[] = [];
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
  public pieChartLabels: Label[] = [['לא', 'הגיעו'], ['הגיעו']];
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
    private alertDialog: MatDialog,
    private toasterService: ToasterService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.dataSource = new MatTableDataSource(this.messages);
      },
      (err) => {
        this.toasterService.popToaster(
          'error',
          'משהו השתבש בעת טעינת העמוד, נסה שנית'
        );
      }
    );
    this.getParcels();
    this.socket.fromEvent('message').subscribe((message: Message) => {
      this.messages.unshift(message);
      const icon = message.arrived ? 'success' : 'warning';
      this.toasterService.popToaster(icon, message.content);
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
