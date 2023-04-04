import { Clinic } from 'src/app/models/clinic';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent {
  clinic = new Clinic; 
}
