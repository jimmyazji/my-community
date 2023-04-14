import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseApiKey = 'https://mycommunity-api.solutions-it.net/app/api/'
  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/login', formData).pipe(
      tap(res => {
        localStorage.setItem('token', res.value.token);
      }), shareReplay());
  }

  register(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/register', formData).pipe(shareReplay());
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      // TODO: verify the token
      return true;
    }
    return false;
  }
}
