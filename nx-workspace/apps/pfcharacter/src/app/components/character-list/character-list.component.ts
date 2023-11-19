import { Character } from './../../../../../../libs/character-classes/character';
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CharacterService } from '../../services/character-http.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  constructor(private authService: AuthService,
    private characterService: CharacterService,
    private router: Router) { }

  characters$ = new Observable<Character[]>;

  ngOnInit(): void {
    this.characters$ = this.characterService.getPlayerCharacters(this.authService.getUser().id);
  }

  addNewCharacter(): void {
    this.characterService.addPlayerCharacter(this.authService.getUser().id).subscribe((res) => {
      console.log(res);
      this.router.navigate([`/character/${res.id}`]);
    });
  }
}
