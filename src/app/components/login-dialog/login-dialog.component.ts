import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  constructor(public dialog: MatDialog) {
  }

  register(e: Event) {
    e.preventDefault();
    this.dialog.closeAll()
    timer(100).subscribe(
      () => { const dialogRef = this.dialog.open(RegisterDialogComponent); }
    )
  }
}
