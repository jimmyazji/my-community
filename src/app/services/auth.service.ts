import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap, Subject, map } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseApiKey = 'https://api.mycommunityclinics.com/app/api/'
  loginAcquired = new Subject();
  authChange = new Subject();

  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/login', formData)
  }

  register(formData: any): Observable<any> {
    return this.http.post<any>(this.baseApiKey + 'users/register', formData).pipe(shareReplay());
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authChange.next(true);
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

  getProfile() {
    return this.http.get(this.baseApiKey + 'users/profile').pipe(
      map((res: any) =>
        res.value = new User().deserialize(res.value)));
  }

  decodeToken(token: string | null): { [key: string]: string } | null {
    return token ? jwt_decode(token) : null;
  }

  getAuthChange() {
    return this.authChange.asObservable();
  }

  getLoginAcquired() {
    return this.loginAcquired.asObservable();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

}
