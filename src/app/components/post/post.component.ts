import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteService } from './../../services/favorite.service';
import { Component, Input, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { RequestAnAppointmentComponent } from '../appointments/request-an-appointment/request-an-appointment.component';
import { Router } from '@angular/router';
import { VideoPlayerConfig } from 'ngx-thumbnail-video';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @ViewChild("myTooltip") myTooltip!: MatTooltip
  @Input() postDetails!: any

  clinicName: string = '';
  clinicImagePath: string = '';
  clinicPhoneNumber: string = '';
  creationTime: string = '';
  text: string = '';
  imagePath: string = '';
  videoPath: string = '';
  instagramUrl: string = '';
  videoThumbnailPath: string = '';
  minutes!: number
  hours!: number
  days!: number

  options: VideoPlayerConfig = {
    width: '800px',
    height: '400px',
    frontendPreload: false
  };
  constructor(private dialog: MatDialog, private router: Router, private favoriteService: FavoriteService, private snackBar: MatSnackBar) { }
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
    this.videoPath = this.postDetails.videoPath;
    this.videoThumbnailPath = this.postDetails.videoThumbnailPath;
  }

  reqAnAppointment() {
    this.dialog.closeAll();
    this.dialog.open(RequestAnAppointmentComponent, {
      autoFocus: true,
      maxHeight: '90vh',
      data : {
        clinic:this.postDetails.clinicId,
        providerId:0
      }
    })
  }

  goToPostDetails() {
    this.dialog.closeAll();
    this.router.navigate(["post-details", this.postDetails.id])
  }

  goToClinicDetails(){
    this.router.navigate(['/clinics', this.postDetails.clinicId])
  }
  
  copyPostPath() {
    return window.location.href.replace('home', `post-details/${this.postDetails.id}`)
  }

  public displayTooltip() {
    this.myTooltip.disabled = false;
    this.myTooltip.show()
    setTimeout(() => {
      this.myTooltip.disabled = true;
    }, 1000);
  }

  toggleFavorite() {
    this.postDetails.isFavourite = !this.postDetails.isFavourite;
    this.favoriteService.addOrRemovePost(this.postDetails.id, this.postDetails.isFavourite).subscribe((res) => {
      if (!res.status) {
        this.unToggleFavorite();
      }
    }, (err) => { this.unToggleFavorite(); })
  }

  unToggleFavorite() {
    this.snackBar.open('Something went wrong, please try again', 'Ok', {
      duration: 3000
    });
    this.postDetails.isFavourite = !this.postDetails.isFavourite;
  }
}
