import { ClinicService } from 'src/app/services/clinic.service';
import { Recommendation } from './../../models/recommendation';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Provider } from './../../models/provider';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { ProviderService } from 'src/app/services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RequestAnAppointmentComponent } from 'src/app/components/appointments/request-an-appointment/request-an-appointment.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, OnDestroy {
  constructor(private providerService: ProviderService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
    private clinicService: ClinicService
  ) { }
  provider: Provider = new Provider;
  reviews: Review[] = [];
  recommendation: Recommendation = new Recommendation;
  reviewFormGroup: FormGroup = new FormGroup({
    rate: new FormControl(0, Validators.min(1)),
    content: new FormControl('')
  });
  reviewSubmitted: boolean = false;
  authChangeSubscription: Subscription = new Subscription;

  getProviderDetails() {
    this.route.params.subscribe((params) => {
      this.providerService.getProviderDetails(params['id']).subscribe(
        (res) => {
          this.provider = res;
        })
    })
  }

  getProviderReviews() {
    this.route.params.subscribe((params) => {
      this.providerService.getProviderReviews(params['id']).subscribe(
        (res) => {
          this.reviews = res;
        })
    })
  }

  submitReview() {
    const formData = { doctorId: this.provider.id, ...this.reviewFormGroup.value }
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
    }
    this.reviewSubmitted = true;
    if (this.reviewFormGroup.invalid) return;
    this.providerService.createReview(formData).subscribe(
      (res) => {
        this.reviewFormGroup.reset({ content: '', rate: 0 });
        this.reviewSubmitted = false;
        this.snackBar.open('Review submitted successfully', 'Ok', {
          duration: 3000
        });
        this.getProviderReviews();
      }
    )
  }

  recommendProvider(value: boolean) {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
    }
    this.route.params.subscribe((params) => {
      this.providerService.recommendProvider({ value: value, doctorId: params['id'] }).subscribe(
        (res) => {
          this.provider.recommendedByUser = value;
          this.getRecommendation();
        })
    })
  }

  getRecommendation() {
    this.route.params.subscribe((params) => {
      this.providerService.getProviderRecommendation(params['id']).subscribe(
        (res) => {
          this.recommendation = res;
        })
    })
  }

  requestAnAppointment() {
    this.clinicService.getClinicDetails(this.provider.clinicId).subscribe((res) => {
      this.dialog.closeAll()
      timer(300).subscribe(
        () => {
          const dialogRef = this.dialog.open(RequestAnAppointmentComponent, {
            data: { clinic: res, providerId: this.provider.id },
            autoFocus: false,
            maxHeight: '40rem'
          });
        }
      )
    })
  }

  recommendedCheck() {
    this.getProviderDetails();
    if (this.provider.recommendedByUser) {
      this.getRecommendation()
    }
  }

  ngOnInit(): void {
    this.getProviderDetails();
    this.getProviderReviews();
    this.authChangeSubscription = this.authService.getAuthChange().subscribe(() => this.recommendedCheck());
  }


  ngOnDestroy(): void {
    this.authChangeSubscription.unsubscribe();
  }
}
