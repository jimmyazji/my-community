import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 50.7512555
  };

  zoom = 2;

  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [

  ];


  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDjlhzM0qKRN-bq-fE5JHDZBot4YGdDoZc&libraries=visualization', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.length > 1 ? this.markerPositions.pop() : this.markerPositions;
    this.markerPositions.push(event.latLng!.toJSON());

  }
}
