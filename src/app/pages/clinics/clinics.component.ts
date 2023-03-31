import { Component } from '@angular/core';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})

export class ClinicsComponent {
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
  ];
}
