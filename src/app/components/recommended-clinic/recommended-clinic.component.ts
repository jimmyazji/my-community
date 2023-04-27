import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, timer } from 'rxjs';
import { RequestAnAppointmentComponent } from '../appointments/request-an-appointment/request-an-appointment.component';
import { ClinicService } from 'src/app/services/clinic.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended-clinic',
  templateUrl: './recommended-clinic.component.html',
  styleUrls: ['./recommended-clinic.component.css']
})
export class RecommendedClinicComponent {

  @Input() clinicDetails1!: Observable<any>;
  clinicDetails!: any;
  @Output() newItemEvent = new EventEmitter<string>();

  paginateOverRecommendedClinics(value: string) {
    this.newItemEvent.emit(value);
  }

  constructor(
    public dialog: MatDialog,
    private _fg: FormBuilder,
    private clinicService: ClinicService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    this.clinicDetails = changes.clinicDetails1.currentValue;
  }

  requestAnAppointment() {
    this.dialog.closeAll()
    timer(300).subscribe(
      () => {
        const dialogRef = this.dialog.open(RequestAnAppointmentComponent, {
          data: this.clinicDetails,
          autoFocus: false,
          maxHeight: '90vh'
        });
      }
    )
  }

  goToClinic() {
    this.router.navigate(["clinics", this.clinicDetails.id]);
  }
}
