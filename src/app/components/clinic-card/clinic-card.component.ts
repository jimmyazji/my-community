import { Component, Input } from '@angular/core';
import { Clinic } from 'src/app/models/clinic';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.css']
})
export class ClinicCardComponent {
  @Input() clinic?: Clinic
}
