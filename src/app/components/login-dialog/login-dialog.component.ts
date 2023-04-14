import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  loginForm!: FormGroup;
  hide = true;

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

  wrongCred: boolean = false;
  login() {
    let formData = new FormData();
    formData.append('Email', this.loginForm.value.myCommunityEm);
    formData.append('Password', this.loginForm.value.Password);

    this.authService.login(formData).subscribe(res => {
      if (res.message.includes('Wrong Credentials')) {
        this.wrongCred = true;
      }
    })
  }

  register() {
    this.dialog.closeAll()
    timer(100).subscribe(
      () => { const dialogRef = this.dialog.open(RegisterDialogComponent); }
    )
  }
}
