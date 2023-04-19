import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent {
  constructor(public dialog: MatDialog) { }
  sideMenuOpen: boolean = false;
  @Output() drawerToggle: EventEmitter<MouseEvent> = new EventEmitter;
  @Input() drawerOpened: boolean = false;

  login() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
  }

  toggleDrawer() {
    this.drawerToggle.emit()
  }
}
