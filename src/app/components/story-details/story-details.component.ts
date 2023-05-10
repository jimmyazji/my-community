import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent {


  creationTime: string = '';
  minutes!: number
  hours!: number
  days!: number
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router:Router,private dialog:MatDialog) {
  }

  ngOnInit() {
    this.creationTime = this.data.creationTime;
    var now = moment(new Date()); //todays date
    var end = moment(this.creationTime).add(-new Date().getTimezoneOffset() / 60, 'hours'); // another date
    var duration = moment.duration(now.diff(end));
    this.hours = Math.trunc(duration.asHours());
    this.minutes = Math.trunc(duration.asMinutes());
    this.days = +duration.days().toFixed(2);
  }

  goToClinic(){
    this.dialog.closeAll();
    this.router.navigate(['/clinics', this.data.clinicId])
  }
}
