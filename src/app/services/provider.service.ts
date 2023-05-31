import { Recommendation } from './../models/recommendation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Provider } from '../models/provider';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  baseApiKey = 'https://api.mycommunityclinics.com/app/api/'
  constructor(private http: HttpClient) { }

  getProviderDetails(id: number): Observable<Provider> {
    return this.http.get(this.baseApiKey + 'doctors/get-doctor-details', { params: { doctorId: id } }).pipe(
      map((res: any) =>
        res.value = new Provider().deserialize(res.value)));
  }

  getProviderReviews(id: number): Observable<Review[]> {
    return this.http.get(this.baseApiKey + 'doctors/reviews/get-doctor-reviews', { params: { doctorId: id } }).pipe(
      map((res: any) =>
        res.value.map((review: Review) => new Review().deserialize(review))));
  }

  createReview(review: { doctorId: number, rate: number, content: string }) {
    return this.http.post<any>(this.baseApiKey + 'doctors/reviews/create-review', review);
  }

  recommendProvider(recommendation: { value: boolean, doctorId: number }) {
    return this.http.post<any>(this.baseApiKey + 'doctors/recommendations/recommend-doctor', recommendation);
  }

  getProviderRecommendation(id: number): Observable<Recommendation> {
    return this.http.get(this.baseApiKey + 'doctors/recommendations/get-doctor-recommendations', { params: { doctorId: id } }).pipe(
      map((res: any) =>
        res.value.map((recommendation: Recommendation) => new Recommendation().deserialize(recommendation))));
  }
}
