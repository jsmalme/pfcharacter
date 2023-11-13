import { LoggedInUser, UserCreation } from './../models/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../models/auth';
import { BehaviorSubject, Observable } from 'rxjs';
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
    return this.http.post('http://127.0.0.1:8000/login/', { credentials });
  }

  logOut() {
    this.user = undefined;
    this.loggedInUser$.next(false);
  }

  createUser(createdUser: UserCreation): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/players/', createdUser);
  }

  public setUser(email: string, username: string, token: string) {
    const user: LoggedInUser = {
      email,
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
