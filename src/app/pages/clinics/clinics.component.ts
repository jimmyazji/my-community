import { ClinicService } from 'src/app/services/clinic.service';
import { Clinic } from './../../models/clinic';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Insurance } from 'src/app/models/insurance';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})

export class ClinicsComponent implements OnInit {
  clinics: Clinic[] = [];
  categories: Category[] = [];
  insurances: Insurance[] = [];

  searchString: string | undefined;
  categoryFilter: number[] = [];
  insuranceFilter: number[] = [];
  searchControl: FormControl = new FormControl(undefined);
  categoryControl: FormControl = new FormControl(undefined);
  insuranceControl: FormControl = new FormControl(undefined);

  constructor(private clinicService: ClinicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchString = params['search'];
      this.categoryFilter = [params['category']];
      this.insuranceFilter = [params['insurance']];
      this.searchControl.setValue(params['search']);
      this.categoryControl.setValue(params['category']);
      this.insuranceControl.setValue(params['insurance']);
    })

    this.getAllClinics(this.searchString, this.categoryFilter, this.insuranceFilter);
    this.getCategories()
    this.getInsurances()
  }

  getAllClinics(search?: string, categoryIds?: number[], insuranceIds?: number[]): void {
    this.clinicService.getAllClinics(search, categoryIds, insuranceIds).subscribe(
      (res) => {
        this.clinics = res;
      }
    )
  }

  handleFilter() {
    if (!this.searchControl.value) this.searchControl.setValue(undefined);
    this.router.navigate([], {
      relativeTo: this.route, replaceUrl: true, queryParams: {
        search: this.searchControl.value,
        category: this.categoryControl.value,
        insurance: this.insuranceControl.value
      }
    }).then(() => { this.getAllClinics(this.searchControl.value, [this.categoryControl.value], [this.insuranceControl.value]) })
  }

  getCategories(): void {
    this.clinicService.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
      }
    )
  }

  getInsurances(): void {
    this.clinicService.getAllInsurances().subscribe(
      (res) => {
        this.insurances = res;
      }
    )
  }
  compareWith(o1: number, o2: number) {
    return o1 == o2;
  }
}
