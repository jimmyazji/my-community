import { ClinicComponent } from './pages/clinic/clinic.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { InsurancesComponent } from './pages/insurances/insurances.component';
import { ClinicsComponent } from './pages/clinics/clinics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
 
  {
    path: 'clinics', children: [
      { path: '', component: ClinicsComponent, pathMatch: 'full' },
      { path: ':id', component: ClinicComponent }
    ]
  },
  {
    path: 'providers', children: [
      { path: ':id', component: ProviderComponent }
    ]
  },
  {
    path: 'post-details/:id', component: PostDetailsComponent
  },
  { path: 'insurances', component: InsurancesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
