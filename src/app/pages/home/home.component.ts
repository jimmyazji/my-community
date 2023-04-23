import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostDetailsComponent } from 'src/app/components/post-details/post-details.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { StoryDetailsComponent } from 'src/app/components/story-details/story-details.component';
import { Category } from 'src/app/models/category';
import { Clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
import { PaginationService } from 'src/app/services/pagination.service';

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
  clinics: Clinic[] = [];
  pagination: any;
  clinicPagination: any;
  constructor(private router: Router, private clinicService: ClinicService, public dialog: MatDialog) {
    this.pagination = new PaginationService();
    this.clinicPagination = new PaginationService();
  }


  ngOnInit(): void {
    this.getAllCategories();
    this.getStories();
    this.getPosts();
    this.getAllClinics();
  }

  getAllCategories() {
    this.clinicService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.pagination.buildArray({ items: this.categories, pageSize: 4 });
    })
  }

  getAllClinics() {
    this.clinicService.getAllClinics().subscribe((res: any) => {
      this.clinics = res;
      this.clinicPagination.buildArray({ items: this.clinics, pageSize: 1 });
    })
  }

  prevIndex(length: number) {
    this.pagination.previousPage();
    this.categories = this.pagination.currentItems();
  }

  nextIndex(endIndex: number) {
    this.pagination.nextPage();
    this.categories = this.pagination.currentItems();
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
    this.clinics = this.clinicPagination.currentItems();
  }

  afterIndex() {
    this.clinicPagination.nextPage();
    this.clinics = this.clinicPagination.currentItems();
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

  openPostModal(post: any) {
    const dialogRef = this.dialog.open(PostDetailsComponent, {
      data: post
    });
  }

  moreClinics() {
    this.router.navigate(['clinics']);
  }

  handleMapToggle(e: boolean) {
    this.recommendedOpen = !e;
  }
}
