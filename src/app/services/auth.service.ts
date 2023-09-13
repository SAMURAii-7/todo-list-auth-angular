import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serviceUrl: string = '';

  constructor(private http: HttpClient) {
    this.serviceUrl = 'http://localhost:8080/api/auth/';
  }

  registerUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<User>(
      this.serviceUrl + 'register',
      user,
      httpOptions
    );
  }

  loginUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<User>(this.serviceUrl + 'login', user, httpOptions);
  }

  logoutUser() {
    return this.http.get(this.serviceUrl + 'logout');
  }

  verifyToken(
    token: string
  ): Observable<{ success: boolean; message: string }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post<{ success: boolean; message: string }>(
      this.serviceUrl + 'verify',
      null,
      httpOptions
    );
  }
}
