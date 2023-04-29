import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  apiLoaded: Observable<boolean>;
  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDjlhzM0qKRN-bq-fE5JHDZBot4YGdDoZc&&libraries=places', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

}
