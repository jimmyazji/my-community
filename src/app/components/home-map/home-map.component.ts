import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapService } from '../../services/google-map.service';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent {
  @Input() clinicLocations!: Observable<any>;
  @Input() mapDialog!: boolean;
  @Input() lat!: number;
  @Input() lng!: number;
  @Output() mapToggled: EventEmitter<boolean> = new EventEmitter;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 50.7512555
  };

  zoom = 2;

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
  @Output() newMarkerPositions: EventEmitter<any> = new EventEmitter<any>();

  apiLoaded!: Observable<boolean>;

  constructor(private googleMapService: GoogleMapService) {
    navigator.geolocation.getCurrentPosition((position) => {
      if(this.markerPositions.length>0){
        this.markerPositions.splice(0,1)
      }
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.markerPositions.push(this.center);
    });
  }


  ngOnInit() {
    this.apiLoaded = this.googleMapService.apiLoaded;
    if (this.mapDialog) {
      this.mapOpen = true;
      this.mapToggled.emit(this.mapOpen);
    }
  }

  ngOnDestroy() {
    this.mapDialog = false;
  }

  ngOnChanges(changes: any) {
    this.markerPositions.splice(0);
    if (changes.lat) {
      this.markerPositions.push({
        lat: changes.lat.currentValue,
        lng: changes.lng.currentValue
      })
    }

    if (changes?.clinicLocations) {
      // deal with asynchronous Observable result
      changes?.clinicLocations.currentValue?.forEach((element: any) => {
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
    if (this.mapDialog) {
      this.markerPositions.splice(0);
      this.markerPositions.push(event.latLng!.toJSON());
      this.newMarkerPositions.emit(this.markerPositions);
    }
  }

}
