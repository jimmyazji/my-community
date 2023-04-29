import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseApiKey = 'https://mycommunity-api.solutions-it.net/app/api/'
  constructor(private http: HttpClient) { }

  
}
