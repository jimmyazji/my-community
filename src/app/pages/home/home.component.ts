import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }
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
  mapOpen: boolean = false;

  ngOnInit(): void {

  }

  openMap(): void {
    this.mapOpen = true;
  }

  closeMap(): void {
    console.log('close')
    this.mapOpen = false;
  }

  moreClinics() {
    this.router.navigate(['clinics']);
  }
}
