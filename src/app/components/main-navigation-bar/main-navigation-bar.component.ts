import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
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
  user: User | null = new User;
  loginAcquiredSubscription: Subscription = new Subscription;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginAcquiredSubscription = this.authService.getLoginAcquired().subscribe(() => this.login());
    this.handleAuth();
  }

  login() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      this.handleAuth();
      if (this.authenticated) {
        this.snackBar.open('Logged in successfully', 'Ok', {
          duration: 3000
        });
      }
    });
  }

  handleAuth() {
    this.authenticated = this.authService.isAuthenticated();
    if (this.authenticated) {
      this.user = this.authService.getUser();
    }
    else { this.user = new User }
  }

  logout() {
    this.authService.logout();
    this.handleAuth();
    if (!this.authenticated) {
      this.snackBar.open('Logged out successfully', 'Ok', {
        duration: 3000
      });
    }
  }

  toggleDrawer() {
    this.drawerToggle.emit()
  }

  ngOnDestroy(): void {
    this.loginAcquiredSubscription.unsubscribe();
  }

}
