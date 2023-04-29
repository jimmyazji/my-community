import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from 'src/app/models/clinic';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.css']
})
export class ClinicCardComponent {
  @Input() clinic?: Clinic
  @Input() withNavigation: boolean = false;
  constructor(private router: Router) { }
  handleClick() {
    if (this.withNavigation) {
      this.router.navigate(['/clinics', this.clinic?.id])
    }
  }
}
