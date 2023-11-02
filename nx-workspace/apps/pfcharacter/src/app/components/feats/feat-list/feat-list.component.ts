/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from 'libs/character-classes/character';
import { Observable, first } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';
import { Feat } from 'libs/character-classes/feats-abilities';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-feat-list',
  templateUrl: './feat-list.component.html',
  styleUrls: ['./feat-list.component.scss'],
})
export class FeatListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  character$: Observable<Character>;
  featList: Feat[] = [];
  constructor(
    private store: CharacterDataService
  ) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.featList = char.feats;
    });
  }

  drop(event: CdkDragDrop<Feat[]>) {
    console.log(event);
    moveItemInArray(this.featList, event.previousIndex, event.currentIndex);
    console.log(this.featList);
  }
}
