/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'libs/character-classes/character';

@Component({
  selector: 'app-character-list-item',
  templateUrl: './character-list-item.component.html',
  styleUrls: ['./character-list-item.component.scss'],
})
export class CharacterListItemComponent implements OnInit {
  @Input() character: Character;

  ngOnInit(): void {
    console.log(this.character);
  }

  constructor() { }
}
