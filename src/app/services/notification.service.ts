import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseApiKey = 'https://api.mycommunityclinics.com/app/api/'

  constructor(private http: HttpClient) { }

  getNotifications(Search?: string, MaxResult: number = 10, Skip?: number): Observable<Notification[]> {
    return this.http.get(this.baseApiKey + 'notifications/user-notifications', { params: new HttpParams({ fromObject: { ...(Search && { Search }), ...(MaxResult && { MaxResult }), ...(Skip && { Skip }) } }) }).pipe(
      map((res: any) =>
        res.dtos.map((notification: Notification) => new Notification().deserialize(notification))));
  }
}
