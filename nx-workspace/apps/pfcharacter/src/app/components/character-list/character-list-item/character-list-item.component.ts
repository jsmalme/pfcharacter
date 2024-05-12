import { CalcTotService } from './../../../services/calc-tot.service';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'libs/character-classes/character';
import { CharacterDataService } from '../../../services/character-data.service';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-character-list-item',
  templateUrl: './character-list-item.component.html',
  styleUrls: ['./character-list-item.component.scss'],
})
export class CharacterListItemComponent {
  @Input() character: Character;
  @Output() deleteCharacterEvent = new EventEmitter();

  constructor(
    private router: Router,
    private store: CharacterDataService,
    private dialog: MatDialog,
    public calcService: CalcTotService,
  ) { }

  deleteCharacter() {
    this.dialog.open(DeleteItemDialogComponent, {
      data: { title: `Delete Character ${this.character.general_info.character_name || 'No name'}`, message: `Are you sure you want to delete this character? All information will be permanently lost!` }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.deleteCharacterEvent.emit(this.character.id);
      }
    });
  }

  playCharacter(): void {
    this.store.loadCharacter(this.character.id);
    this.router.navigate(['character']);
  }
}
