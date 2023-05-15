import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrls: ['./logout-confirmation-dialog.component.css']
})
export class LogoutConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>) { }

  confirmLogout() {
    this.dialogRef.close(true);
  }
}
