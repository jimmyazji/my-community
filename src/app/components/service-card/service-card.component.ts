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
  descriptionShown: boolean = false;

  toggleCard() {
    this.open = !this.open;
    if (this.open) {
      timer(500).subscribe(() => { this.descriptionShown = this.open });
    } else {
      this.descriptionShown = this.open;
    }
  }
}
