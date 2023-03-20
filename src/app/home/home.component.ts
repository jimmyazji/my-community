import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }
  clinics = [
    {
      "name": "Melisa Hahn",
      "rating": 0,
      "phone": "0940 336 26"
    },
    {
      "name": "Briggs Calderon",
      "rating": 4,
      "phone": "0992 481 85"
    },
    {
      "name": "Inez Day",
      "rating": 1,
      "phone": "0947 467 49"
    },
    {
      "name": "Luna Padilla",
      "rating": 3,
      "phone": "0916 478 64"
    },
    {
      "name": "Lena Barron",
      "rating": 4,
      "phone": "0915 423 50"
    },
    {
      "name": "Henderson Gilmore",
      "rating": 2,
      "phone": "0960 490 29"
    },
    {
      "name": "Brooke Ball",
      "rating": 2,
      "phone": "0929 477 58"
    },
    {
      "name": "Ellis Langley",
      "rating": 2,
      "phone": "0923 487 29"
    },
    {
      "name": "Jacklyn Shaw",
      "rating": 5,
      "phone": "0906 430 23"
    },
    {
      "name": "Mitchell Carver",
      "rating": 2,
      "phone": "0917 454 28"
    },
    {
      "name": "Bethany Wilson",
      "rating": 1,
      "phone": "0912 413 29"
    },
    {
      "name": "Lina Bradford",
      "rating": 1,
      "phone": "0935 402 72"
    },
    {
      "name": "Ericka Shelton",
      "rating": 3,
      "phone": "0962 462 95"
    },
    {
      "name": "Ryan Reed",
      "rating": 5,
      "phone": "0990 597 87"
    },
    {
      "name": "Fuentes Munoz",
      "rating": 0,
      "phone": "0976 471 45"
    },
    {
      "name": "Ila Justice",
      "rating": 3,
      "phone": "0918 578 70"
    },
    {
      "name": "Callahan Vasquez",
      "rating": 4,
      "phone": "0991 510 79"
    },
    {
      "name": "Hartman Ray",
      "rating": 5,
      "phone": "0951 574 39"
    },
    {
      "name": "Dunn Humphrey",
      "rating": 2,
      "phone": "0973 541 82"
    },
    {
      "name": "Middleton Spears",
      "rating": 1,
      "phone": "0970 592 93"
    }
  ];
  moreClinics() {
    this.router.navigate(['clinic']);
  }
}
