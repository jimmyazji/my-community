import { Provider } from './../../models/provider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }
  provider: Provider = new Provider;
  reviews: Review[] = [];

  getProviderDetails() {
    this.route.params.subscribe((params) => {
      this.providerService.getProviderDetails(params['id']).subscribe(
        (res) => {
          this.provider = res;
          console.log(res);
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

  ngOnInit(): void {
    this.getProviderDetails();
    this.getProviderReviews();
  }
}
