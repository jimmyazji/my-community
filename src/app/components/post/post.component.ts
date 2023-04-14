import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() postDetails!: any

  clinicName: string = '';
  clinicImagePath: string = '';
  clinicPhoneNumber: string = '';
  creationTime: string = '';
  text: string = '';
  imagePath: string = '';
  videoThumbnailPath: string = '';
  minutes!: number
  hours!: number
  days!: number
  ngOnInit() {
    this.clinicName = this.postDetails.clinicName;
    this.clinicImagePath = this.postDetails.clinicImagePath;
    this.clinicPhoneNumber = this.postDetails.clinicPhoneNumber;
    this.creationTime = this.postDetails.creationTime;
    var now = moment(new Date()); //todays date
    var end = moment(this.creationTime).add(-new Date().getTimezoneOffset() / 60, 'hours'); // another date
    var duration = moment.duration(now.diff(end));
    this.hours = Math.trunc(duration.asHours());
    this.minutes = Math.trunc(duration.asMinutes());
    this.days = +duration.days().toFixed(2);
    this.text = this.postDetails.text;
    this.imagePath = this.postDetails.imagePath;
    this.videoThumbnailPath = this.postDetails.videoThumbnailPath;
  }
}
