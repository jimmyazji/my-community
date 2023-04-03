import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiKey = 'https://mycommunity-api.solutions-it.net/app/api/'
  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/login', formData)
  }

  register(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/register', formData)
  }
}
