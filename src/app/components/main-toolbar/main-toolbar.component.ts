import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/notification';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})

export class MainToolbarComponent {
  notifications: Notification[] = [];
  constructor(private authService: AuthService, private router: Router) { }


  openNotifications() {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
      return
    }
    this.router.navigate(['/notifications'])
  }
  openFavorite() {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
    }
    this.router.navigate(['/favorite'])
  }

}
