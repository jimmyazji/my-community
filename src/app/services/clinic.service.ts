import { Clinic } from './../models/clinic';
import { Location } from './../models/location';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { Service } from '../models/service';
import { Insurance } from '../models/insurance';
import { Review } from '../models/review';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  baseApiKey = 'https://api.mycommunityclinics.com/app/api/'
  constructor(private http: HttpClient) { }

  getStories(): Observable<any[]> {
    return this.http.get<any>(this.baseApiKey + 'clinics/stories/get-storyline-cards')
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any>(this.baseApiKey + 'clinics/posts/get-posts-by-pagination?pageId=1&pageCount=10000')
  }

  getClinicByNameSearch(searchInput: string) {
    return this.http.get<any>(this.baseApiKey + 'clinics/posts/get-posts-by-pagination?pageId=1&pageCount=10000')
  }

  searchClinicByName(text: any): Observable<any> {
    return this.http.get(this.baseApiKey + `clinics?Search=${text}`)
  }

  getAllClinics(search?: string, categoryIds?: number[], insurancesIds?: number[]): Observable<Clinic[]> {
    const Filters = search ? 'name@=' + search : undefined;
    const IncludeCategoriesIds = categoryIds?.[0] ?? undefined;
    const InsurancesIds = insurancesIds?.[0] ?? undefined;
    return this.http.get(this.baseApiKey + 'clinics', { params: new HttpParams({ fromObject: { ...(Filters && { Filters }), ...(IncludeCategoriesIds && { IncludeCategoriesIds }), ...(InsurancesIds && { InsurancesIds }) } }) }).pipe(
      map((res: any) =>
        res.dtos.map((clinic: Clinic) => new Clinic().deserialize(clinic))));
  }

  getRecommendedClinics(): Observable<Clinic[]> {
    const Filters = 'isRecommended==true';
    return this.http.get(this.baseApiKey + 'clinics', { params: new HttpParams({ fromObject: { ...(Filters && { Filters }) } }) }).pipe(
      map((res: any) =>
        res.dtos.map((clinic: Clinic) => new Clinic().deserialize(clinic))));
  }
  getAllInsurances(search?: any): Observable<any[]> {
    const Filters = search ? 'name@=' + search : undefined;
    return this.http.post(this.baseApiKey + 'clinics/all-insurances', {}, { params: new HttpParams({ fromObject: { ...(Filters && { Filters }) } }) }).pipe(
      map((res: any) =>
        res.value.map((insurance: Insurance) => new Insurance().deserialize(insurance))));
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(this.baseApiKey + 'categories/get-all').pipe(
      map((res: any) =>
        res.value.map((category: Category) => new Category().deserialize(category))));
  }

  getClinicDetails(id: number): Observable<Clinic> {
    return this.http.get(this.baseApiKey + 'clinics/get-clinic-details-by-id', { params: { clinicId: id } }).pipe(
      map((res: any) =>
        res.value = new Clinic().deserialize(res.value)));
  }

  getClinicLocations(id: number): Observable<any[]> {
    return this.http.get<any>(this.baseApiKey + 'clinics/get-clinic-locations', { params: { clinicId: id } }).pipe(
      map((res: any) =>
        res.value.map((location: Location) => new Location().deserialize(location)))
    )
  }

  getNearestClinicLocation(lng: number, lat: number) {
    return this.http.get<any>(this.baseApiKey + `clinics/get-nearest-clinics-locations?longitude=${lng}&latitude=${lat}`)
  }
  getClinicServices(id: number): Observable<Service[]> {
    return this.http.get(this.baseApiKey + 'clinics/get-clinic-services', { params: { clinicId: id } }).pipe(
      map((res: any) =>
        res.value.map((service: Service) => new Service().deserialize(service))));
  }
  getClinicInsurance(id: number): Observable<Insurance[]> {
    return this.http.get(this.baseApiKey + 'clinics/get-clinic-insurances', { params: { clinicId: id } }).pipe(
      map((res: any) =>
        res.value.map((insurance: Insurance) => new Insurance().deserialize(insurance))));
  }
  getClinicReviews(id: number): Observable<Insurance[]> {
    return this.http.get(this.baseApiKey + 'clinics/reviews/get-clinic-reviews', { params: { clinicId: id } }).pipe(
      map((res: any) =>
        res.value.map((review: Review) => new Review().deserialize(review))));
  }

  getDoctorsByClinicId(id: number) {
    return this.http.get(this.baseApiKey + 'doctors/get-doctors-by-clinicId', { params: { clinicId: id } })
  }

  requestAnAppointment(formValue: any) {
    return this.http.post(this.baseApiKey + 'clinics/appointments/create-appointment', formValue)
  }

  getPostDetailsById(id: number) {
    return this.http.get(this.baseApiKey + 'clinics/posts/get-post-details-by-id', { params: { postId: id } });
  }

  createReview(review: { clinicId: number, rate: number, content: string }) {
    return this.http.post<any>(this.baseApiKey + 'clinics/reviews/create-clinic-review', review);
  }

  getClinicBeforeAfter(id: number): Observable<any[]> {
    return this.http.get<any>(this.baseApiKey + 'clinics/before-and-after/get-clinic-before-and-after', { params: { clinicId: id, pageId: 1, pageCount: 100 } }).pipe(
      map((res: any) =>
        res = res.value));
  }
  getClinicPosts(id: number): Observable<any[]> {
    return this.http.get<any>(this.baseApiKey + 'clinics/get-clinic-posts', { params: { clinicId: id } }).pipe(
      map((res: any) =>
        res = res.value));
  }
  getClinicStories(id: number): Observable<any[]> {
    return this.http.get<any>(this.baseApiKey + 'clinics/stories/get-clinic-stories', { params: { clinicId: id } }).pipe(
      map((res: any) =>
        res = res.value));
  }
}
