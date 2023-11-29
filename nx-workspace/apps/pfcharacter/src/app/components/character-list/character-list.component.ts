import { Character } from './../../../../../../libs/character-classes/character';
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CharacterService } from '../../services/character-http.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CharacterDataService } from '../../services/character-data.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  constructor(private authService: AuthService,
    private store: CharacterDataService,
    private characterService: CharacterService,
    private router: Router) { }

  cols = 2;
  isMobileScreen = false;
  characterObjectHeight = '18em';
  characters$ = new Observable<Character[]>;

  ngOnInit(): void {
    this.isMobileScreen = window.innerWidth < 922;
    if (this.isMobileScreen) {
      this.cols = 1;
    }
    this.characters$ = this.characterService.getPlayerCharacters(this.authService.getUser().id);
  }

  deleteCharacter(characterId: number): void {
    this.store.deleteCharacter(characterId).subscribe(() => {
      this.characters$ = this.characterService.getPlayerCharacters(this.authService.getUser().id);
    });
  }

  addNewCharacter(): void {
    this.characterService.addPlayerCharacter(this.authService.getUser().id).subscribe((res) => {
      this.store.loadCharacter(res.id);
      this.router.navigate(['character']);
    });
  }
}
