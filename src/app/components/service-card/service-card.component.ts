
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() service: Service = new Service;

  constructor(private dialog: MatDialog) { }
  openService() {
    this.dialog.open(ServiceDialogComponent, { data: { service: this.service } });
  }
}
