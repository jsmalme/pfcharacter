/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { CombatInfo } from '../../../../../../libs/character-classes/combat-info';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})

export class CombatComponent implements OnInit { 
  gridWatcher: Subscription | undefined;
  combatInfoForm!: FormGroup;
  cols: number | undefined = 2;
  rowHeight: string | number = '3:1';

  colMap = new Map([
    ['xs', 1],
    ['sm', 1],
    ['md', 2],
    ['lg', 2],
    ['xl', 2]
  ]);

  constructor(private characterService: CharacterService,
    private mediaObserver: MediaObserver) {}


  ngOnInit(): void {
    this.createFormGroup(this.characterService.getCombatInfo());

    //angular grid bootstrapping thingy
    this.gridWatcher = this.mediaObserver
      .asObservable()
      .subscribe((change: MediaChange[]) => {
          console.log(change[0].mqAlias);
          this.cols = this.colMap.get(change[0].mqAlias) as number;
        });
  }

  createFormGroup(combatInfo: CombatInfo): void{
    this.combatInfoForm = new FormGroup({
      initiativeTotal: new FormControl(combatInfo.initiativeTotal),
      initiativeDexMod: new FormControl(combatInfo.initiativeDexMod),
      initiativeMiscMod: new FormControl(combatInfo.initiativeMiscMod),
      baseAttackBonus: new FormControl(combatInfo.baseAttackBonus),
      cmbTotal: new FormControl(combatInfo.cmbTotal),
      cmbStrMod: new FormControl(combatInfo.cmbStrMod),
      cmbSizeMod: new FormControl(combatInfo.cmbSizeMod),
      cmbMiscMod: new FormControl(combatInfo.cmbMiscMod),
      cmbTempMod: new FormControl(combatInfo.cmbTempMod),
      weapons: new FormArray([])
    });
  }

}
