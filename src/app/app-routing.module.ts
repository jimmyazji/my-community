import { ClinicComponent } from './pages/clinic/clinic.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { InsurancesComponent } from './pages/insurances/insurances.component';
import { ClinicsComponent } from './pages/clinics/clinics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'clinics', children: [
      { path: '', component: ClinicsComponent, pathMatch: 'full' },
      { path: ':id', component: ClinicComponent }
    ]
  },
  { path: 'insurance', component: InsurancesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
