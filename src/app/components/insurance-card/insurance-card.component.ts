import { Insurance } from '../../models/insurance';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-insurance-card',
  templateUrl: './insurance-card.component.html',
  styleUrls: ['./insurance-card.component.css']
})
export class InsuranceCardComponent {
  @Input() insurance?: Insurance;
}
