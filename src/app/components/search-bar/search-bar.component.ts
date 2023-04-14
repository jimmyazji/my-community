import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  search: FormControl = new FormControl<string | undefined | null>(undefined);
  clinics: any[] = [];
  constructor(private clinicService: ClinicService, private router: Router) { }
  test(text: any) {
    this.clinicService.searchClinicByName(text).subscribe(res => {
      this.clinics = res.dtos;
    })
  }

  navigateToSelectedClinic(clinicId: number) {
    this.clinics = [];
    this.router.navigate(["clinics", clinicId]);
  }
}
