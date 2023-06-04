import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent implements OnInit, OnDestroy {
  @Output() drawerToggle: EventEmitter<MouseEvent> = new EventEmitter;
  @Input() drawerOpened: boolean = false;
  sideMenuOpen: boolean = false;
  authenticated: boolean = false;
  user: User | null = null;
  loginAcquiredSubscription: Subscription = new Subscription;
  authChangeSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.handleAuth();
    this.loginAcquiredSubscription = this.authService.getLoginAcquired().subscribe(() => this.login());
    this.authChangeSubscription = this.authService.getAuthChange().subscribe(() => this.handleAuthChange());
  }

  login() {
    this.dialog.open(LoginDialogComponent, { panelClass: 'login-dialog', });
  }

  handleAuthChange() {
    this.handleAuth();
    const message = this.authenticated ? 'Successfully logged in' : 'Successfully logged out'
    this.snackBar.open(message, 'ok', { duration: 3000 })
  }

  handleAuth() {
    this.authenticated = this.authService.isAuthenticated();
    if (this.authenticated) this.user = this.authService.getUser();
  }

  logout() {
    this.dialog.open(LogoutConfirmationDialogComponent);
  }

  toggleDrawer() {
    this.drawerToggle.emit()
  }

  ngOnDestroy(): void {
    this.loginAcquiredSubscription.unsubscribe();
    this.authChangeSubscription.unsubscribe();
  }

}
