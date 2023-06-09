import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { timer } from 'rxjs';
type ValidationErrors = { [key: string]: string }

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {

  registerForm!: FormGroup;
  hide = true;
  errorResponse: string | null = null;
  validationErrors: ValidationErrors = {};
  constructor(
    public dialog: MatDialog,
    private _fg: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this._fg.group({
      gender: [undefined, Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      p: ['', Validators.required],
      cp: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      image: File
    })
  }


  register() {
    let formData = new FormData();
    this.errorResponse = null;
    formData.append('FirstName', this.registerForm.value.fname)
    formData.append('LastName', this.registerForm.value.lname)
    formData.append('UserName', this.registerForm.value.userName)
    formData.append('PhoneNumber', this.registerForm.value.phoneNumber)
    formData.append('Email', this.registerForm.value.email)
    formData.append('Password', this.registerForm.value.p)
    formData.append('Gender', this.registerForm.value.gender)
    formData.append('ProfileImage', this.registerForm.value.image)

    this.authService.register(formData).subscribe(res => {
      if(!res.status){
        this.errorResponse = res.message;
      }
      this.dialog.closeAll()
      this.snackBar.open('Registration completed successfully', 'Ok', {
        duration: 3000
      });
      timer(300).subscribe(
        () => this.authService.loginAcquired.next(true)
      )
    },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 400) {
            this.validationErrors = err.error.errors;
            this.errorResponse = err.error.title;
          }
        }
      })
  }

  file!: File;
  imageBase64 = '';
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.registerForm.get('image')?.setValue(event.target.files[0])
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        // convert image to base64 format
        this.imageBase64 = reader.result as string;
      };
    }
  }

}
