import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostDetailsComponent } from 'src/app/components/post-details/post-details.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { StoryDetailsComponent } from 'src/app/components/story-details/story-details.component';
import { Category } from 'src/app/models/category';
import { ClinicService } from 'src/app/services/clinic.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  startIndex = 0;
  endIndex = 4;

  constructor(private router: Router, private clinicService: ClinicService, public dialog: MatDialog) { }
 
  stories: any[] = []

  posts = []
  categories: Category[] = []

  // categories!: Category[];
  paginationService = new PaginationService();
  ngOnInit(): void {
    this.getAllCategories();

    this.paginationService.buildArray(this.categories);
    this.getStories();
    this.getPosts();
  }

  getAllCategories() {
    this.clinicService.getAllCategories().subscribe((res: any) => {

      this.categories = res;
    })
  }

  prevIndex(length: number) {
    this.paginationService.previousPage();
    this.categories = this.paginationService.getCurrentPageData()
  }
  nextIndex(endIndex: number) {
    this.paginationService.nextPage();
    this.categories = this.paginationService.getCurrentPageData()
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
}
