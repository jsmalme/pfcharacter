import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    return decodedToken.exp < Date.now() / 1000;
  }

  private decodeToken(token: string): any {
    return jwtDecode(token);
  }
}
