import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, NgZone, Output, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, catchError, map, of } from 'rxjs';
import { ClinicService } from 'src/app/services/clinic.service';
import { GoogleMapService } from 'src/app/services/google-map.service';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 50.7512555
  };

  zoom = 2;

  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [

  ];


  apiLoaded!: Observable<boolean>;

  constructor(private googleMapService: GoogleMapService, private ngZone: NgZone, private clinicService: ClinicService, private dialogRef: MatDialogRef<MapDialogComponent>) {

  }

  latitude!: any;
  longitude!: any;
  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center
    // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    //   this.searchElementRef.nativeElement
    // );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
  }

  ngOnInit() {
    this.apiLoaded = this.googleMapService.apiLoaded;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  update(event: any) {
    this.latitude = event[event.length - 1].lat;
    this.longitude = event[event.length - 1].lng;
  }

  searchForClinics() {
    this.clinicService.getNearestClinicLocation(this.longitude, this.latitude).subscribe((res: any) => {
      res.value = res.value.filter((value: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.clinicId === value.clinicId
        ))
      )
      this.dialogRef.close(res.value);
    })
  }

}
