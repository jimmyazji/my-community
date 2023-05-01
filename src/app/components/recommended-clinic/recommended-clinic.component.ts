import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, timer } from 'rxjs';
import { RequestAnAppointmentComponent } from '../appointments/request-an-appointment/request-an-appointment.component';
import { ClinicService } from 'src/app/services/clinic.service';
import { Router } from '@angular/router';
import { Clinic } from 'src/app/models/clinic';

@Component({
  selector: 'app-recommended-clinic',
  templateUrl: './recommended-clinic.component.html',
  styleUrls: ['./recommended-clinic.component.css']
})
export class RecommendedClinicComponent {


  @Input() clinic: Clinic = new Clinic;
  @Output() newItemEvent = new EventEmitter<string>();

  paginateOverRecommendedClinics(value: string) {
    this.newItemEvent.emit(value);
  }

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    this.clinic = changes.clinic.currentValue;
  }

  requestAnAppointment() {
    this.dialog.closeAll()
    timer(300).subscribe(
      () => {
        const dialogRef = this.dialog.open(RequestAnAppointmentComponent, {
          data: { clinic: this.clinic },
          autoFocus: false,
          maxHeight: '40rem'
        });
      }
    )
  }

  goToClinic() {
    this.router.navigate(["clinics", this.clinic.id]);
  }
}
