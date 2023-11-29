import { LoggedInUser, UserCreation } from './../models/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../models/auth';
import { BehaviorSubject } from 'rxjs';
import { InterceptorService } from './interceptor.service';
import { JwtService } from './jwt.service';

const baseUrl = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private jwt: { access: string, refresh: string } = { access: '', refresh: '' };
  private user: LoggedInUser = { username: '', email: '', id: 0 };

  constructor(private http: HttpClient,
    private jwtService: JwtService) { }

  logIn(credentials: UserCredentials) {
    return this.http.post(`${baseUrl}/login/`, credentials);
  }

  refreshToken(localStorage: string | null = null) {
    return this.http.post(`${baseUrl}/token/refresh/`, { refresh: localStorage ?? this.jwt.refresh });
  }

  public getRefreshToken(): string {
    return this.jwt.refresh;
  }

  public getToken(): string | null {
    return this.jwt.access;
  }

  logOut() {
    InterceptorService.token = '';
    this.jwt = { access: '', refresh: '' };
    this.loggedInUser$.next(false);
  }

  createUser(createdUser: UserCreation) {
    return this.http.post(`${baseUrl}/signup/`, createdUser);
  }

  public setUser(jwt: { refresh: string, access: string }) {
    InterceptorService.token = jwt.access;
    this.jwt.access = jwt.access;
    this.jwt.refresh = jwt.refresh;
    const decodedToken = this.jwtService.decodeToken(jwt.access);
    this.user = {
      username: decodedToken.username,
      email: decodedToken.email,
      id: decodedToken.user_id
    }
    this.loggedInUser$.next(true);
  }

  public getUser(): LoggedInUser {
    return this.user;
  }

  public isAuthenticated(): boolean {
    if (!this.jwt) {
      return false;
    }
    return !this.jwtService.isTokenExpired(this.jwt.access);
  }
}
