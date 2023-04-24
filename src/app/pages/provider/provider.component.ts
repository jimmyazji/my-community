import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Provider } from './../../models/provider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { ProviderService } from 'src/app/services/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  constructor(private providerService: ProviderService, private route: ActivatedRoute, private snackBar: MatSnackBar, private authService: AuthService) { }
  provider: Provider = new Provider;
  reviews: Review[] = [];
  reviewFormGroup: FormGroup = new FormGroup({
    rate: new FormControl(0, Validators.required),
    content: new FormControl('', [Validators.required, Validators.min(50)])
  });
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
    this.providerService.createReview(formData).subscribe(
      (res) => {
        this.reviewFormGroup.reset({ content: '', rate: 0 });
        this.snackBar.open('Review submitted successfully', 'Ok', {
          duration: 3000
        });
        this.getProviderReviews();
      }
    )
  }

  ngOnInit(): void {
    this.getProviderDetails();
    this.getProviderReviews();
  }
}
