/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Character } from './../../../../../../libs/character-classes/character';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Component, OnInit } from '@angular/core';
import { RollResultComponent } from '../roll-result/roll-result.component';
import { MatLegacySnackBarRef as MatSnackBarRef } from '@angular/material/legacy-snack-bar';
import { Observable, first } from 'rxjs';
import { CharacterDataService } from '../../services/character-data.service';
import { Abilities } from 'libs/character-classes/abilities';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss'],
})

export class RollComponent implements OnInit {
  character$: Observable<Character>
  abilities: AbilitySelection[] = [];
  ability_mod = new AbilitySelection('None', 0);
  customMod = null;
  quantity = 1;

  die: DiceChip[] = [
    { type: 'D4', selected: false, value: 4 },
    { type: 'D6', selected: false, value: 6 },
    { type: 'D8', selected: false, value: 8 },
    { type: 'D10', selected: false, value: 10 },
    { type: 'D12', selected: false, value: 12 },
    { type: 'D20', selected: true, value: 20 },
    { type: 'D100', selected: false, value: 100 }
  ]
  constructor(
    private dialog: MatDialog,
    private snackBarRef: MatSnackBarRef<RollComponent>,
    private store: CharacterDataService
  ) { }

  ngOnInit() {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.createAbilityList(char.abilities);
    });
  }

  roll() {
    let rollResults: number[] = [];
    let diceType = '';
    this.die.forEach(d => {
      if (d.selected) {
        diceType = d.type;
        rollResults = this.rollDie(d.value);
      }
    });

    this.dialog.open(RollResultComponent, {
      data: { rolls: rollResults, modifier: this.ability_mod, customMod: this.customMod ?? 0, diceType: diceType }
    });
  }

  rollDie(value: number): number[] {
    const rolls: number[] = [];
    for (let i = 0; i < this.quantity; i++) {
      rolls.push(Math.floor(Math.random() * value) + 1);
    }
    return rolls;
  }

  changeSelection(die: DiceChip) {
    this.die.forEach(d => {
      if (d.type !== die.type) {
        d.selected = false;
      }
      else {
        d.selected = true;
      }
    });
  }

  createAbilityList(abilities: Abilities) {
    this.abilities = [
      new AbilitySelection('None', 0),
      new AbilitySelection('Strength', abilities.str.useMod),
      new AbilitySelection('Dexterity', abilities.dex.useMod),
      new AbilitySelection('Constitution', abilities.con.useMod),
      new AbilitySelection('Intelligence', abilities.int.useMod),
      new AbilitySelection('Wisdom', abilities.wis.useMod),
      new AbilitySelection('Charisma', abilities.cha.useMod)
    ]
  }

  close() {
    this.snackBarRef.dismiss();
  }
}

export class AbilitySelection {
  name: string;
  mod: number | null;

  constructor(name: string, mod: number | null) {
    this.name = name;
    this.mod = mod;
  }
}

class DiceChip {
  type: string;
  selected: boolean;
  value: number;
}
