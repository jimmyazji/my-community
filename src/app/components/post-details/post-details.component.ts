import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { VideoPlayerConfig } from 'ngx-thumbnail-video';
import { ClinicService } from 'src/app/services/clinic.service';
import { RequestAnAppointmentComponent } from '../appointments/request-an-appointment/request-an-appointment.component';
import { MatTooltip } from '@angular/material/tooltip';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  @ViewChild("myTooltip") myTooltip!: MatTooltip

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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clinicService: ClinicService,
    private dialog: MatDialog,
    private favoriteService: FavoriteService,
    private snackBar: MatSnackBar) {
    this.route.params.subscribe((params) => {
      this.clinicService.getPostDetailsById(params['id']).subscribe(
        (res: any) => {
          this.data = res.value;
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

  toggleFavorite() {
    this.data.isFavourite = !this.data.isFavourite;
    this.favoriteService.addOrRemovePost(this.data.id, this.data.isFavourite).subscribe((res) => {
      if (!res.status) {
        this.unToggleFavorite();
      }
    }, (err) => { this.unToggleFavorite(); })
  }

  unToggleFavorite() {
    this.snackBar.open('Something went wrong, please try again', 'Ok', {
      duration: 3000
    });
    this.data.isFavourite = !this.data.isFavourite;
  }

  ngOnInit() {

  }


  reqAnAppointment() {
    this.dialog.closeAll();
    this.dialog.open(RequestAnAppointmentComponent, {
      autoFocus: true,
      maxHeight: '90vh',
      data: {
        clinic: this.data.clinicId,
        providerId: 0
      }
    })
  }

  backToHome() {
    window.history.back();
  }
  copyPostPath() {
    return window.location.href
  }

  public displayTooltip() {
    this.myTooltip.disabled = false;
    this.myTooltip.show()
    setTimeout(() => {
      this.myTooltip.disabled = true;
    }, 1000);
  }
}
