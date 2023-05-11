
import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() service: Service = new Service;
  open: boolean = false;
}
