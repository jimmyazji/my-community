import { ClinicService } from 'src/app/services/clinic.service';
import { Clinic } from './../../models/clinic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})

export class ClinicsComponent implements OnInit {
  clinics: Clinic[] = [];

  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.getAllClinics();
  }
  
  getAllClinics() {
    this.clinicService.getAllClinics().subscribe(
      (res) => {
        this.clinics = res;
      }
    )
  }
}
