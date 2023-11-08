/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { Observable } from 'rxjs';
import { Character } from 'libs/character-classes/character';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  character$: Observable<Character>;
  constructor(
    private store: CharacterDataService
  ) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
  }
}
