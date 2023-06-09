import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule} from '@angular/material/expansion'; 
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { StarRatingModule } from 'angular-star-rating';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GoogleMapsModule } from '@angular/google-maps';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgxThumbnailVideoModule } from 'ngx-thumbnail-video';
import { ChangeOnScrollDirective } from './change-on-scroll.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ClinicsComponent } from './pages/clinics/clinics.component';
import { InsurancesComponent } from './pages/insurances/insurances.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ClinicComponent } from './pages/clinic/clinic.component';

import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { MainNavigationBarComponent } from './components/main-navigation-bar/main-navigation-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { ClinicCardComponent } from './components/clinic-card/clinic-card.component';
import { HorizontalScrollDirective } from './horizontal-scroll.directive';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { InsuranceCardComponent } from './components/insurance-card/insurance-card.component';
import { StoryComponent } from './components/story/story.component';
import { PostComponent } from './components/post/post.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { InputComponent } from './components/input/input.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ArchComponent } from './components/arch/arch.component';
import { RatingComponent } from './components/rating/rating.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { RecommendedClinicComponent } from './components/recommended-clinic/recommended-clinic.component';
import { ProviderCardComponent } from './provider-card/provider-card.component';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { RequestAnAppointmentComponent } from './components/appointments/request-an-appointment/request-an-appointment.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeMapComponent } from './components/home-map/home-map.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LocaleSwitcherComponent } from './components/locale-switcher/locale-switcher.component';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { SocialComponent } from './components/social/social.component';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { ServiceDialogComponent } from './components/service-dialog/service-dialog.component';
import { SpecialMapComponent } from './components/map-dialog/special-map/special-map.component';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainNavigationBarComponent,
    HomeComponent,
    ClinicsComponent,
    InsurancesComponent,
    AboutUsComponent,
    ContactUsComponent,
    ButtonComponent,
    ClinicCardComponent,
    HorizontalScrollDirective,
    ChangeOnScrollDirective,
    CategoryCardComponent,
    InsuranceCardComponent,
    StoryComponent,
    PostComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    InputComponent,
    SearchBarComponent,
    ClinicComponent,
    ArchComponent,
    RatingComponent,
    ServiceCardComponent,
    ReviewCardComponent,
    RecommendedClinicComponent,
    LoaderComponent,
    StoryDetailsComponent,
    PostDetailsComponent,
    ProviderCardComponent,
    ProviderComponent,
    RequestAnAppointmentComponent,
    SidenavComponent,
    HomeMapComponent,
    MapDialogComponent,
    LocaleSwitcherComponent,
    NotificationsComponent,
    NotificationComponent,
    FavoriteComponent,
    ProfileComponent,
    SocialComponent,
    LogoutConfirmationDialogComponent,
    ServiceDialogComponent,
    SpecialMapComponent,
    
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatSidenavModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MaterialModule,
    LoadingBarHttpClientModule,
    BrowserAnimationsModule,
    NgxThumbnailVideoModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatMenuModule,
    MatSnackBarModule,
    ClipboardModule,
    MatProgressBarModule,
    StarRatingModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
