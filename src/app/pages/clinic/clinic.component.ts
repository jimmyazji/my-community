import { Clinic } from 'src/app/models/clinic';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent {
  clinic: Clinic = {
    id: 0,
    name: 'Clinic Name',
    phone: '0987 451 35',
    rating: 2,
    description: 'A Human Doctor Specialized In The Cosmetic Department Performs Surgical Plastic surgeriesresulting From Burns Andeverything Related To Cosmetic As Well A Human Doctor A Human Doctor Specialized In The Cosmetic Department Performs Surgical Plasticsurgeriesresulting From Burns Andeverything Related To Cosmetic As Well A Human Doctor...'
  }
}
