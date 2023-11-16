/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, ICharacter } from 'libs/character-classes/character';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }
  private const baseUrl = 'http://127.0.0.1:8000/';


  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    return throwError(() => errorMessage);
  }

  getPlayerCharacters(): Observable<Character[]> {
    return this.http.get<ICharacter[]>(`${this.baseUrl}/characters/`).pipe(
  }

  getCharacter(): Observable<Character> {
    return this.http.get<ICharacter>(this.characterUrl).pipe(
      map((data) => {
        return new Character(data);
      }),
      catchError(err => this.handleError(err))
    );
  }

  updateCharacter(character: ICharacter): Observable<ICharacter> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.characterUrl} + ${character.id}`;
    return this.http.put<ICharacter>(url, character, { headers: headers }).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
