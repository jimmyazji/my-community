import { AuthService } from 'src/app/services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/notification';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})

export class MainToolbarComponent {
  notifications: Notification[] = [];
  constructor(private authService: AuthService, private router: Router) { }
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger | undefined;

  
  toggleNotifications() {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
      this.menuTrigger?.closeMenu();
      return;
    }
    this.menuTrigger?.openMenu();
  }

  openFavorite() {
    if (!this.checkAuth()) return;
    this.router.navigate(['/favorite']);
  }

  checkAuth(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginAcquired.next(true);
      return false;
    }
    return true
  }
}
