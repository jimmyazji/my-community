import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
type ValidationErrors = { [key: string]: string }
@Component({
  selector: 'app-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  hide = true;
  validationErrors: ValidationErrors = {};
  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email],),
    password: new FormControl('', Validators.required)
  });
  errorResponse: string | null = null;
  submitted = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) { }



  login() {
    this.errorResponse = null;
    this.submitted = true;
    if (this.loginFormGroup.invalid) return;
    const formData = new FormData();
    formData.append('Email', this.loginFormGroup.value.email);
    formData.append('Password', this.loginFormGroup.value.password);

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
      () => { const dialogRef = this.dialog.open(RegisterDialogComponent, { maxHeight: '42rem' }); }
    )
  }
}
