import { UserCreation } from './../models/auth';
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

  constructor(private http: HttpClient,
    private jwtService: JwtService) { }

  logIn(credentials: UserCredentials) {
    return this.http.post(`${baseUrl}/login/`, credentials);
  }

  refreshToken() {
    const refreshHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.jwt.refresh,
    })
    return this.http.post(`${baseUrl}/token/refresh/`, {}, { headers: refreshHeaders });
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
    this.loggedInUser$.next(true);
  }

  public isAuthenticated(): boolean {
    if (!this.jwt) {
      return false;
    }
    return !this.jwtService.isTokenExpired(this.jwt.access);
  }
}
