import { Clinic } from './../models/clinic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


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
}
