import { FormControl } from '@angular/forms';
import { Insurance } from '../../models/insurance';
import { ClinicService } from './../../services/clinic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent implements OnInit {
  searchString: string | undefined;
  insurances: Insurance[] = [];
  searchControl: FormControl = new FormControl(undefined);
  constructor(private clinicService: ClinicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchString = params['search'];
      this.searchControl.setValue(params['search']);
    })

    this.getInsurances();
  }

  getInsurances(search?: string) {
    this.clinicService.getAllInsurances(search).subscribe((res) => {
      this.insurances = res;
    })
  }

  handleFilter() {
    if (!this.searchControl.value) this.searchControl.setValue(undefined);
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParams: { search: this.searchControl.value } }).then(() => { this.getInsurances(this.searchControl.value) })
  }

  openClinics(insuranceId: number) {
    this.router.navigate(['clinics'], { queryParams: { insurance: insuranceId } })
  }
}
