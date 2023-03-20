import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { MainNavigationBarComponent } from './main-navigation-bar/main-navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ClinicComponent } from './clinic/clinic.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ButtonComponent } from './components/button/button.component';
import { ClinicCardComponent } from './components/clinic-card/clinic-card.component';
import { HorizontalScrollDirective } from './horizontal-scroll.directive';
import { ChangeOnScrollDirective } from './change-on-scroll.directive';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { InsuranceCardComponent } from './components/insurance-card/insurance-card.component';
import { StoryComponent } from './components/story/story.component';
import { PostComponent } from './components/post/post.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainNavigationBarComponent,
    HomeComponent,
    ClinicComponent,
    InsuranceComponent,
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
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
