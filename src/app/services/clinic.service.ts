import { Clinic } from './../models/clinic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  baseApiKey = 'https://mycommunity-api.solutions-it.net/app/api/'
  constructor(private http: HttpClient) { }

  getAllClinics(): Observable<Clinic[]> {
    return this.http.get(this.baseApiKey + 'clinics').pipe(
      map((res: any) =>
        res.dtos.map((clinic: Clinic) => new Clinic().deserialize(clinic))));
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseApiKey + 'categories/get-all')
  }

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
}
