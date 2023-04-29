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
import { NotificationsComponent } from './page/notifications/notifications.component';
import { FavoriteComponent } from './page/favorite/favorite.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
  { path: 'notifications', component: NotificationsComponent },
  { path: 'favorite', component: FavoriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
