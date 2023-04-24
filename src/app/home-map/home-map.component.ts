import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent {
  @Input() clinicLocations!: Observable<any>;
  @Output() mapToggled: EventEmitter<boolean> = new EventEmitter;
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

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
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

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  mapOpen: boolean = false; @HostListener('document:keydown.esc', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.closeMap();
  }


  openMap(): void {
    this.mapOpen = true;
    this.mapToggled.emit(this.mapOpen);
  }

  closeMap(): void {
    this.mapOpen = false;
    this.mapToggled.emit(this.mapOpen);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng!.toJSON());
  }

}
