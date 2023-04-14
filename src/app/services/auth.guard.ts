import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private authService: AuthService, private dialog: MatDialog) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        const dialogRef = this.dialog.open(LoginDialogComponent);
        return false;
    }
}
