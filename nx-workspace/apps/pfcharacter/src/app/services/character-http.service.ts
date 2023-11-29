import { Player } from './../../../../../libs/character-classes/player';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, ICharacter } from 'libs/character-classes/character';
import { catchError, map, Observable, throwError } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    return throwError(() => errorMessage);
  }

  getPlayerCharacters(playerId: number): Observable<Character[]> {
    return this.http.get<Player>(`${baseUrl}/players/${playerId}/`).pipe(
      map((data) => {
        return data.characters.map((char) => new Character(char));
      }),
      catchError(err => this.handleError(err))
    );
  }

  getCharacter(characterId: number): Observable<Character> {
    return this.http.get<ICharacter>(`${baseUrl}/characters/${characterId}/`).pipe(
      map((data) => {
        return new Character(data);
      }),
      catchError(err => this.handleError(err))
    );
  }

  addPlayerCharacter(playerId: number): Observable<Character> {
    const character = new Character();
    character.player = playerId; //set current playerId

    return this.http.post<ICharacter>(`${baseUrl}/characters/`, character).pipe(
      map((data) => {
        return new Character(data);
      }),
      catchError(err => this.handleError(err))
    );
  }

  updateCharacter(patchData: any, characterId: number): Observable<any> {
    const url = `${baseUrl}/characters/${characterId}/`;
    return this.http.patch(url, patchData).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteCharacter(characterId: number): Observable<any> {
    const url = `${baseUrl}/characters/${characterId}/`;
    return this.http.delete(url).pipe(
      catchError(err => this.handleError(err))
    );
  }

  filterFeats(value: string): Observable<any> {
    const url = `${baseUrl}/feats/?name=${value}`;
    return this.http.get(url).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
