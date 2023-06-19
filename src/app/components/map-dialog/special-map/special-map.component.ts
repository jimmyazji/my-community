import { Component, ElementRef, Inject, NgZone, ViewChild } from '@angular/core';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { ClinicService } from 'src/app/services/clinic.service';
import { GoogleMapService } from 'src/app/services/google-map.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-special-map',
  templateUrl: './special-map.component.html',
  styleUrls: ['./special-map.component.css']
})
export class SpecialMapComponent {

  @ViewChild('search') searchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 50.7512555
  };

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  zoom = 8;

  scaledSize: google.maps.Size = {
    width: 25,
    height: 25,
    equals: function(other: google.maps.Size) {
      return other.width === this.width && other.height === this.height;
    }
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: '../../../assets/images/21-1024.webp',
      scaledSize: this.scaledSize
    }
 };
  markerPositions: google.maps.LatLngLiteral[] = [];

  apiLoaded!: Observable<boolean>;

  constructor(
    private googleMapService: GoogleMapService,
    mapDirectionsService: MapDirectionsService,
    private dialogRef: MatDialogRef<SpecialMapComponent>,
    private clinicService: ClinicService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      if(this.markerPositions.length>0){
        this.markerPositions.splice(0,1)
      }
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.markerPositions.push(this.center);
      if(data){
        const request: google.maps.DirectionsRequest = {
          destination: { lat: +this.data.latitude, lng: this.data.longitude },
          origin: { lat: +position.coords.latitude, lng: +position.coords.longitude },
          travelMode: google.maps.TravelMode.DRIVING
        };
        this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markerPositions.push(this.center);
      }

    });

  }



  ngOnInit() {
    this.apiLoaded = this.googleMapService.apiLoaded;

  }

  ngOnChanges(changes: any) {
    this.markerPositions.splice(0);
    if (changes?.lat) {
      this.markerPositions.push({
        lat: changes.lat.currentValue,
        lng: changes.lng.currentValue
      })
    }


    if (changes.clinicLocations) {
      // deal with asynchronous Observable result
      changes.clinicLocations.currentValue.forEach((element: any) => {
        this.markerPositions.push({
          lat: element.latitude,
          lng: element.longitude
        })
      });
    }
  }


  ngAfterViewInit() {

    const searchBox = new google.maps.places.SearchBox(
      this.searchField?.nativeElement
    )
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField?.nativeElement
    )
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places?.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          if (this.markerPositions.length > 0) {
            this.markerPositions.pop();
          }
          this.markerPositions.push({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          })
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    })
  }





  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.splice(0);
    this.markerPositions.push(event.latLng!.toJSON());
  }

  searchForClinics() {
    this.clinicService.getNearestClinicLocation(this.markerPositions[0].lng, this.markerPositions[0].lat).subscribe((res: any) => {
      res.value = res.value.filter((value: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.clinicId === value.clinicId
        ))
      )
      this.dialogRef.close(res.value);
    })
  }

}
