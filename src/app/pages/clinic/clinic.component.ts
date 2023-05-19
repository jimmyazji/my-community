import { MatSnackBar } from '@angular/material/snack-bar';
import { Insurance } from '../../models/insurance';
import { ActivatedRoute } from '@angular/router';
import { ClinicService } from './../../services/clinic.service';
import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Service } from 'src/app/models/service';
import { Review } from 'src/app/models/review';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { RequestAnAppointmentComponent } from 'src/app/components/appointments/request-an-appointment/request-an-appointment.component';
import { MapDialogComponent } from 'src/app/components/map-dialog/map-dialog.component';
import { SpecialMapComponent } from 'src/app/components/map-dialog/special-map/special-map.component';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  constructor(
    private clinicService: ClinicService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }
  clinic: Clinic = new Clinic;
  locations: Location[] = [];
  services: Service[] = [];
  insurances: Insurance[] = [];
  reviews: Review[] = [];
  posts: any = [];
  stories: any = [];

  reviewFormGroup: FormGroup = new FormGroup({
    rate: new FormControl(0, [Validators.required, Validators.min(1)],),
    content: new FormControl('')
  });
  reviewSubmitted: boolean = false;

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
    this.reviewSubmitted = true;
    if (this.reviewFormGroup.invalid) return;
    const formData = { clinicId: this.clinic.id, ...this.reviewFormGroup.value }
    this.clinicService.createReview(formData).subscribe(
      (res) => {
        this.reviewFormGroup.reset({ content: '', rate: 0 });
        this.reviewSubmitted = false;
        this.snackBar.open('Review submitted successfully', 'Ok', {
          duration: 3000
        });
        this.getClinicReviews();
      }
    )
  }

  requestAnAppointment() {
    this.dialog.closeAll()
    timer(300).subscribe(
      () => {
        const dialogRef = this.dialog.open(RequestAnAppointmentComponent, {
          data: { clinic: this.clinic, providerId: undefined },
          autoFocus: false,
          maxHeight: '40rem'
        });
      }
    )
  }

  openMap(location: Location) {
    const dialogRef = this.dialog.open(SpecialMapComponent, {
      autoFocus: true,
      maxHeight: '42rem',
      data: location
    });
  }

  getClinicPosts() {
    this.route.params.subscribe((params) => {
      this.clinicService.getClinicPosts(params['id']).subscribe((res) => {
        this.posts = res;
      })
    });
  }

  getClinicStories() {
    this.route.params.subscribe((params) => {
      this.clinicService.getClinicStories(params['id']).subscribe((res) => {
        this.stories = res;
      })
    });
  }

  ngOnInit(): void {
    this.getClinicDetails();
    this.getClinicLocations();
    this.getClinicServices();
    this.getClinicInsurances();
    this.getClinicReviews();
    this.getClinicPosts();
    this.getClinicStories();
  }


}
