import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { RequestAnAppointmentComponent } from '../appointments/request-an-appointment/request-an-appointment.component';
import { Router } from '@angular/router';
import { Clinic } from 'src/app/models/clinic';

@Component({
  selector: 'app-recommended-clinic',
  templateUrl: './recommended-clinic.component.html',
  styleUrls: ['./recommended-clinic.component.css']
})
export class RecommendedClinicComponent {
  @Input() clinic: Clinic = new Clinic;
  @Input() message!: string
  @Output() newItemEvent = new EventEmitter<string>();

  paginateOverRecommendedClinics(value: string) {
    this.newItemEvent.emit(value);
  }

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnChanges(changes: any) {
    this.clinic = changes.clinic?.currentValue;
    setTimeout(() => {
      this.message = changes.message?.currentValue;
    }, 1000)

  }

  requestAnAppointment() {
    this.dialog.closeAll()
    timer(300).subscribe(
      () => {
        const dialogRef = this.dialog.open(RequestAnAppointmentComponent, {
          data: { clinic: this.clinic },
          autoFocus: false,
          maxHeight: '90vh',
        });
      }
    )
  }

  goToClinic() {
    this.router.navigate(["clinics", this.clinic.id]);
  }
}
