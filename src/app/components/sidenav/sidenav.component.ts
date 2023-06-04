import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  constructor(private authService: AuthService, public dialog: MatDialog,
  ) { }
  @Output() closeSidenav: EventEmitter<MouseEvent> = new EventEmitter;
  authenticated: boolean = false;
  user: User | null = null;
  authChangeSubscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.handleAuth()
    this.authChangeSubscription = this.authService.getAuthChange().subscribe(() => this.handleAuth());
  }

  handleAuth() {
    this.authenticated = this.authService.isAuthenticated()
    if (this.authenticated) this.user = this.authService.getUser();
  }

  handleNavigation() {
    this.closeSidenav.emit();
  }

  login() {
    this.authService.loginAcquired.next(true);
  }

  logout() {
    this.dialog.open(LogoutConfirmationDialogComponent);
  }

}
