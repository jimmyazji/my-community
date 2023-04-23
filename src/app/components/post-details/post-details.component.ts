import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { VideoPlayerConfig } from 'ngx-thumbnail-video';
import { ClinicService } from 'src/app/services/clinic.service';
import { RequestAnAppointmentComponent } from '../appointments/request-an-appointment/request-an-appointment.component';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {


  creationTime: string = '';
  minutes!: number
  hours!: number
  days!: number
  data: any


  options: VideoPlayerConfig = {
    width: '900px',
    height: '450px',
    frontendPreload: false
  };


  constructor(private route: ActivatedRoute, private clinicService: ClinicService, private dialog: MatDialog) {
    this.route.params.subscribe((params) => {
      this.clinicService.getPostDetailsById(params['id']).subscribe(
        (res: any) => {
          this.data = res.value
          this.creationTime = this.data.creationTime;
          var now = moment(new Date()); //todays date
          var end = moment(this.creationTime).add(-new Date().getTimezoneOffset() / 60, 'hours'); // another date
          var duration = moment.duration(now.diff(end));
          this.hours = Math.trunc(duration.asHours());
          this.minutes = Math.trunc(duration.asMinutes());
          this.days = +duration.days().toFixed(2);
        })
    })
  }


  ngOnInit() {

  }


  reqAnAppointment() {
    this.dialog.open(RequestAnAppointmentComponent)
  }
}
