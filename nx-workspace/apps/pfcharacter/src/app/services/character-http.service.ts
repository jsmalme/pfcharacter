/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Abilities } from 'libs/character-classes/abilities';
import { Character } from 'libs/character-classes/character';
import { CombatInfo } from 'libs/character-classes/combat-info';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService{

  constructor(private http: HttpClient) { }
  private characterUrl = 'api/character/1';


  private handleError(err: HttpErrorResponse){
    let errorMessage: string;
    if (err.error instanceof Error) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    return throwError(() => errorMessage);
  }

  getCharacter(): Observable<Character>{
    return this.http.get<Character>(this.characterUrl).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateCharacter(character: Character): Observable<Character>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.characterUrl} + ${character.id}`;
    return this.http.put<Character>(url, character, {headers: headers}).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
