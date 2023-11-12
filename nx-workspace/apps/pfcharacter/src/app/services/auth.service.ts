import { LoggedInUser } from './../models/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../models/auth';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: LoggedInUser | undefined = undefined;
  helper = new JwtHelperService();

  constructor(private http: HttpClient,) { }

  logIn(credentials: UserCredentials,) {
    return this.http.post('http://127.0.0.1:8000/api/login', { credentials });
  }

  public setUser(id: number, username: string, token: string) {
    const user: LoggedInUser = {
      id,
      username,
      token
    };
    this.user = user;
    this.loggedInUser$.next(true);
  }

  public isAuthenticated(): boolean {
    if (!this.user?.token) {
      return false;
    }
    return !this.helper.isTokenExpired(this.user.token);
  }
}
