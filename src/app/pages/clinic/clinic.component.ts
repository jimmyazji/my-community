import { Insurance } from './../../models/Insurance';
import { ActivatedRoute } from '@angular/router';
import { ClinicService } from './../../services/clinic.service';
import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Service } from 'src/app/models/service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  constructor(private clinicService: ClinicService, private route: ActivatedRoute) { }
  clinic: Clinic = new Clinic;
  locations: Location[] = [];
  services: Service[] = [];
  insurances: Insurance[] = [];
  reviews: Review[] = [];

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

  ngOnInit(): void {
    this.getClinicDetails();
    this.getClinicLocations();
    this.getClinicServices();
    this.getClinicInsurances();
    this.getClinicReviews();
  }
}
