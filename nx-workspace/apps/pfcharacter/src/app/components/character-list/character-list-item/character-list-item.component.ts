/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'libs/character-classes/character';
import { CharacterDataService } from '../../../services/character-data.service';

@Component({
  selector: 'app-character-list-item',
  templateUrl: './character-list-item.component.html',
  styleUrls: ['./character-list-item.component.scss'],
})
export class CharacterListItemComponent implements OnInit {
  @Input() character: Character;

  constructor(
    private router: Router,
    private store: CharacterDataService
  ) { }

  ngOnInit(): void {
    console.log(this.character);
  }

  playCharacter(): void {
    this.store.loadCharacter(this.character.id);
    this.router.navigate(['character']);
  }
}
