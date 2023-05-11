import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MapDialogComponent } from 'src/app/components/map-dialog/map-dialog.component';
import { StoryDetailsComponent } from 'src/app/components/story-details/story-details.component';
import { Insurance } from 'src/app/models/Insurance';
import { Category } from 'src/app/models/category';
import { Clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
import { PaginationService } from 'src/app/services/pagination.service';
window.HTMLElement.prototype.scrollIntoView = function () { };
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recommendedOpen: boolean = true;
  startIndex = 0;
  endIndex = 4;
  stories: any[] = []
  posts = []
  categories: Category[] = [];
  paginatedCategories: Category[] = []
  insurances: Insurance[] =[]
  PaginatedInsurances: Insurance[] = [];
  clinics: any[] = [];
  clinicsByFilter: Clinic[] = [];
  pagination: any;
  clinicPagination: any;
  insurancePagination: any;
  recommendedClinics:Clinic[]=[];
  
  constructor(private router: Router, private clinicService: ClinicService, public dialog: MatDialog) {
    this.pagination = new PaginationService();
    this.clinicPagination = new PaginationService();
    this.insurancePagination = new PaginationService();
  }

  selectedCardIndex: number = -1;
  selectedInsuranceCardIndex:number = -1;

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllInsurance();
    this.getStories();
    this.getPosts();
    this.getAllClinics();
    this.getRecommendedClinics()
  }

  getRecommendedClinics(){
    this.clinicService.getRecommendedClinics().subscribe((res:Clinic[])=> {
      this.recommendedClinics = res;
      this.clinicPagination.buildArray({ items: this.recommendedClinics, pageSize: 1 });
      setInterval(() => {
        this.recommendedClinics = this.clinicPagination.currentItems();
      }, 15000)
    })
  }

  getAllInsurance() {
    this.PaginatedInsurances = this.insurances;
    this.insurancePagination.buildArray({ items: this.PaginatedInsurances, pageSize: 8 });
    this.clinicService.getAllInsurances().subscribe((res: Insurance[]) => {
      this.insurances = res;
      this.PaginatedInsurances = res;
      this.pagination.buildArray({ items: this.PaginatedInsurances, pageSize: 8 });
    })
  }

  searchInInsurance(searchWord:any){
    this.clinicService.getAllInsurances(searchWord.value).subscribe((res: Insurance[]) => {
      this.insurances = res;
      this.PaginatedInsurances = res;
      this.pagination.buildArray({ items: this.PaginatedInsurances, pageSize: 8 });
    })
  }

  insuranceClickedProp: boolean = false;
  insuranceClicked(insurance: Insurance) {
    // this.insuranceClickedProp = !this.insuranceClickedProp;
    // this.clinicService.getAllClinics('', 0, +insurance.id!).subscribe((res: any) => {
    //   this.clinicsByFilter = res;
    // })
  }

  getAllCategories() {
    this.clinicService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.paginatedCategories = res
      this.pagination.buildArray({ items: this.paginatedCategories, pageSize: 4 });
    })
  }

  categoryClickedProp: boolean = false;
  categoryClicked(category: Category) {
    this.categoryClickedProp = !this.categoryClickedProp;
    this.clinicService.getAllClinics('', [category.id!]).subscribe((res: any) => {
      this.clinicsByFilter = res;
    })
  }


  getAllClinics() {
    this.clinicService.getAllClinics().subscribe((res: any) => {
      this.clinics = res;
      
    })
  }

  clinicLocations!: Observable<any>;
  getClinicLocation(clinic: Clinic) {
    this.clinicService.getClinicLocations(clinic.id!).subscribe((res: any) => {
      this.clinicLocations = res;
    })
  }


  getOffset(el: any) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  scroll() {
    window.scrollTo(this.getOffset(document.getElementById('homeMap')).left, this.getOffset(document.getElementById('homeMap')).top)
  }

  prevIndex(length: number) {
    this.pagination.previousPage();
    this.paginatedCategories = this.pagination.currentItems();
  }

  nextIndex(endIndex: number) {
    this.pagination.nextPage();
    this.paginatedCategories = this.pagination.currentItems();
  }

  prevInsuranceIndex(length: number) {
    this.insurancePagination.previousPage();
    this.PaginatedInsurances = this.insurancePagination.currentItems();
  }

  nextInsuranceIndex(length: number) {
    this.insurancePagination.nextPage();
    this.PaginatedInsurances = this.insurancePagination.currentItems();
  }

  scrollItem(newItem: string) {
    if (newItem === 'before') {
      this.beforeIndex();
    } else {
      this.afterIndex();
    }
  }

  beforeIndex() {
    this.clinicPagination.previousPage();
    this.recommendedClinics = this.clinicPagination.currentItems();
  }

  afterIndex() {
    this.clinicPagination.nextPage();
    this.recommendedClinics = this.clinicPagination.currentItems();
  }


  getStories() {
    this.clinicService.getStories().subscribe((res: any) => {
      this.stories = res.value;
    })
  }

  openStoryModal(story: any) {
    const dialogRef = this.dialog.open(StoryDetailsComponent, {
      data: story
    });
  }

  getPosts() {
    this.clinicService.getPosts().subscribe((res: any) => {
      this.posts = res.value;
    })
  }

  moreClinics() {
    this.router.navigate(['clinics']);
  }


  openMapForSearch() {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      autoFocus: true,
      maxHeight: '100vh'
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      res.forEach((ele: any) => {
        if (!this.clinicsByFilter.find((obj: any) => obj.clinicId === ele.clinicId)) {
          this.clinicService.getClinicDetails(ele.clinicId).subscribe(res => {
            this.clinicsByFilter.push(res);
          })
        }
      })
    })
  }

  handleMapToggle(e: boolean) {
    this.recommendedOpen = !e;
  }
}
