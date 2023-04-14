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
  @HostListener('document:keydown.esc', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.closeMap();
  }
  clinics = [
    {
      "id": 0,
      "name": "Melisa Hahn",
      "rating": 0,
      "phone": "0940 336 26"
    },
    {
      "id": 1,
      "name": "Briggs Calderon",
      "rating": 4,
      "phone": "0992 481 85"
    },
    {
      "id": 2,
      "name": "Inez Day",
      "rating": 1,
      "phone": "0947 467 49"
    },
    {
      "id": 3,
      "name": "Luna Padilla",
      "rating": 3,
      "phone": "0916 478 64"
    },
    {
      "id": 4,
      "name": "Lena Barron",
      "rating": 4,
      "phone": "0915 423 50"
    },
    {
      "id": 5,
      "name": "Henderson Gilmore",
      "rating": 2,
      "phone": "0960 490 29"
    },
    {
      "id": 6,
      "name": "Brooke Ball",
      "rating": 2,
      "phone": "0929 477 58"
    },
    {
      "id": 7,
      "name": "Ellis Langley",
      "rating": 2,
      "phone": "0923 487 29"
    },
    {
      "id": 8,
      "name": "Jacklyn Shaw",
      "rating": 5,
      "phone": "0906 430 23"
    },
    {
      "id": 9,
      "name": "Mitchell Carver",
      "rating": 2,
      "phone": "0917 454 28"
    },
    {
      "id": 10,
      "name": "Bethany Wilson",
      "rating": 1,
      "phone": "0912 413 29"
    },
    {
      "id": 11,
      "name": "Lina Bradford",
      "rating": 1,
      "phone": "0935 402 72"
    },
    {
      "id": 12,
      "name": "Ericka Shelton",
      "rating": 3,
      "phone": "0962 462 95"
    },
    {
      "id": 13,
      "name": "Ryan Reed",
      "rating": 5,
      "phone": "0990 597 87"
    },
    {
      "id": 14,
      "name": "Fuentes Munoz",
      "rating": 0,
      "phone": "0976 471 45"
    },
    {
      "id": 15,
      "name": "Ila Justice",
      "rating": 3,
      "phone": "0918 578 70"
    },
    {
      "id": 16,
      "name": "Callahan Vasquez",
      "rating": 4,
      "phone": "0991 510 79"
    },
    {
      "id": 17,
      "name": "Hartman Ray",
      "rating": 5,
      "phone": "0951 574 39"
    },
    {
      "id": 18,
      "name": "Dunn Humphrey",
      "rating": 2,
      "phone": "0973 541 82"
    },
    {
      "id": 19,
      "name": "Middleton Spears",
      "rating": 1,
      "phone": "0970 592 93"
    }
  ];

  stories: any[] = []

  posts = []
  categories: Category[] = []

  // categories!: Category[];
  mapOpen: boolean = false;
  paginationService = new PaginationService();
  ngOnInit(): void {
    this.getAllCategories();

    this.paginationService.buildArray(this.categories);
    this.getStories();
    this.getPosts();
  }

  getAllCategories() {
    this.clinicService.getAllCategories().subscribe((res: any) => {

      this.categories = res.value;
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
  openMap(): void {
    this.mapOpen = true;
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

  closeMap(): void {
    this.mapOpen = false;
  }

  moreClinics() {
    this.router.navigate(['clinics']);
  }
}
