import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
type ValidationErrors = { [key: string]: string }
@Component({
  selector: 'app-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  loginForm!: FormGroup;
  hide = true;
  validationErrors: ValidationErrors = {};

  constructor(
    public dialog: MatDialog,
    private _fg: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this._fg.group({
      myCommunityEm: ['', Validators.required],
      Password: ''
    })
  }

  errorResponse: string | null = null;
  login() {
    this.errorResponse = null;
    const formData = new FormData();
    formData.append('Email', this.loginForm.value.myCommunityEm);
    formData.append('Password', this.loginForm.value.Password);

    this.authService.login(formData).subscribe(res => {
      if (!res.status) {
        this.errorResponse = res.message;
      } else {
        localStorage.setItem('authToken', res.value.token);
        this.dialog.closeAll();
      }
    }, (err) => {
      this.validationErrors = err.error.errors;
      this.errorResponse = err.error.title;
    })
  }

  register() {
    this.dialog.closeAll()
    timer(300).subscribe(
      () => { const dialogRef = this.dialog.open(RegisterDialogComponent); }
    )
  }
}
