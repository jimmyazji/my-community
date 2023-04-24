import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap, Subject } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseApiKey = 'https://mycommunity-api.solutions-it.net/app/api/'
  loginAcquired = new Subject();

  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/login', formData).pipe(
      tap(res => {
        localStorage.setItem('authToken', res.value.token);
      }), shareReplay());
  }

  register(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/register', formData).pipe(shareReplay());
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUser(): User | null {
    const decodedToken = this.decodeToken(this.getToken());
    const user: User = new User;
    if (decodedToken) {
      user.email = decodedToken['email'];
      user.name = decodedToken['name'];
      user.username = decodedToken['Username'];
      user.imagePath = decodedToken['Image'];
    }
    return user;
  }

  decodeToken(token: string | null): { [key: string]: string } | null {
    return token ? jwt_decode(token) : null;
  }

  getLoginAcquired() {
    return this.loginAcquired.asObservable();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

}
