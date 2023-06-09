import { DialogConfig } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';
@Component({
  selector: 'app-request-an-appointment',
  templateUrl: './request-an-appointment.component.html',
  styleUrls: ['./request-an-appointment.component.css']
})
export class RequestAnAppointmentComponent {
  appointmentForm!: FormGroup;
  hide = true;
  errorResponse: string | null = null;
  validationErrors: ValidationErrors = {};
  doctorsList: any[] = [];
  locationsList: any[] = [];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { clinic: any, providerId?: number },
    private _fg: FormBuilder,
    private clinicService: ClinicService,
    private snackBar: MatSnackBar,
  ) {
    this.appointmentForm = this._fg.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      doctor: [this.data.providerId, Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      image: File,
      notes: ['', Validators.required],

    })
  }

  getClinicLocations() {
    this.clinicService.getClinicLocations(this.data.clinic.id).subscribe(res => {
      this.locationsList = res;
    })
  }

  getDoctorsByClinicId() {
    this.clinicService.getDoctorsByClinicId(this.data.clinic.id).subscribe((res: any) => {
      this.doctorsList = res.value;
    })
  }

  ngOnInit() {
    this.getClinicLocations();
    this.getDoctorsByClinicId();
  }



  reqAnAppointment() {
    let formData = new FormData();
    formData.set('Notes', this.appointmentForm.value.notes);
    formData.set('InsuranceFile', this.appointmentForm.value.image);
    formData.set('DoctorId', this.appointmentForm.value.doctor);
    formData.set('LocationId', this.appointmentForm.value.location);
    formData.set('PatientFirstName', this.appointmentForm.value.fname);
    formData.set('PatienLastName', this.appointmentForm.value.lname);
    formData.set('PatientPhoneNumber', this.appointmentForm.value.phoneNumber);
    formData.set('PatientEmail', this.appointmentForm.value.email);
    this.clinicService.requestAnAppointment(formData).subscribe(res => {
      this.snackBar.open('Appointment send successfully', 'Ok', {
        duration: 3000
      });
      this.dialog.closeAll();
    })
  }

  imageBase64: any;
  changeInput(event: any) {
    const reader = new FileReader();
    this.appointmentForm.get('image')?.setValue(event.target.files[0])
    if (event.target.files && event.target.files.length) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        // convert image to base64 format
        this.imageBase64 = reader.result as string;

      };
    }

  }

}
