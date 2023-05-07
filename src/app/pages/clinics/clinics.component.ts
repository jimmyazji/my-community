import { ClinicService } from 'src/app/services/clinic.service';
import { Clinic } from './../../models/clinic';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})

export class ClinicsComponent implements OnInit {
  clinics: Clinic[] = [];
  categories: Category[] = [];

  searchString: string | undefined;
  categoryFilter: number[] = [];
  searchControl: FormControl = new FormControl(undefined);
  categoryControl: FormControl = new FormControl(undefined);

  constructor(private clinicService: ClinicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchString = params['search'];
      this.categoryFilter = [params['category']];
      this.searchControl.setValue(params['search']);
    })

    this.getAllClinics(this.searchString, this.categoryFilter);
    this.getCategories()
  }

  getAllClinics(search?: string, categoryIds?: number[]): void {
    this.clinicService.getAllClinics(search, categoryIds).subscribe(
      (res) => {
        this.clinics = res;
      }
    )
  }

  handleFilter() {
    if (!this.searchControl.value) this.searchControl.setValue(undefined);
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParams: { search: this.searchControl.value, category: this.categoryControl.value } }).then(() => { this.getAllClinics(this.searchControl.value, [this.categoryControl.value]) })
  }

  getCategories(): void {
    this.clinicService.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
      }
    )
  }
}
