import { MatSnackBar } from '@angular/material/snack-bar';
import { Insurance } from './../../models/Insurance';
import { ActivatedRoute } from '@angular/router';
import { ClinicService } from './../../services/clinic.service';
import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Service } from 'src/app/models/service';
import { Review } from 'src/app/models/review';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  constructor(private clinicService: ClinicService, private route: ActivatedRoute, private snackBar: MatSnackBar, private authService: AuthService) { }
  clinic: Clinic = new Clinic;
  locations: Location[] = [];
  services: Service[] = [];
  insurances: Insurance[] = [];
  reviews: Review[] = [];

  reviewFormGroup: FormGroup = new FormGroup({
    rate: new FormControl(0, Validators.required),
    content: new FormControl('', [Validators.required, Validators.min(50)])
  });

  getClinicDetails() {
    this.route.params.subscribe((params) => {
      this.clinicService.getClinicDetails(params['id']).subscribe(
        (res) => {
          this.clinic = res;
        })
    })
  }
  getClinicLocations() {
    this.route.params.subscribe((params) => {
      this.clinicService.getClinicLocations(params['id']).subscribe(
        (res) => {
          this.locations = res;
        })
    })
  }

  getClinicServices() {
    this.route.params.subscribe((params) => {
      this.clinicService.getClinicServices(params['id']).subscribe(
        (res) => {
          this.services = res;
        })
    })
  }

  getClinicInsurances() {
    this.route.params.subscribe((params) => {
      this.clinicService.getClinicInsurance(params['id']).subscribe(
        (res) => {
          this.insurances = res;
        })
    })
  }

  getClinicReviews() {
    this.route.params.subscribe((params) => {
      this.clinicService.getClinicReviews(params['id']).subscribe(
        (res) => {
          this.reviews = res;
        })
    })
  }

  
  submitReview() {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
    }
    const formData = { clinicId: this.clinic.id, ...this.reviewFormGroup.value }
    this.clinicService.createReview(formData).subscribe(
      (res) => {
        this.reviewFormGroup.reset({ content: '', rate: 0 });
        this.snackBar.open('Review submitted successfully', 'Ok', {
          duration: 3000
        });
        this.getClinicReviews();
      }
    )
  }

  recommendClinic() {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
    }
  }

  ngOnInit(): void {
    this.getClinicDetails();
    this.getClinicLocations();
    this.getClinicServices();
    this.getClinicInsurances();
    this.getClinicReviews();
  }
}
