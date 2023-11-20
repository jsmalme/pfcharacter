import { Player } from './../../../../../libs/character-classes/player';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, ICharacter } from 'libs/character-classes/character';
import { GeneralInfo } from 'libs/character-classes/general-info';
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
    character.playerId = playerId; //set current playerId

    return this.http.post<ICharacter>(`${baseUrl}/characters/`, character).pipe(
      map((data) => {
        return new Character(data);
      }),
      catchError(err => this.handleError(err))
    );
  }

  updateCharacter(character: ICharacter): Observable<ICharacter> {
    const url = `${baseUrl}/characters/${character.id}/`;
    return this.http.put<ICharacter>(url, character).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateGeneralInfo(character: Character): Observable<GeneralInfo> {
    const url = `${baseUrl}/characters/${character.id}/`;
    const patchData = { general_info: character.general_info };
    return this.http.patch<GeneralInfo>(url, patchData).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
