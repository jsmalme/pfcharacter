/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { OffenseInfo } from '../../../../../../libs/character-classes/offense-info';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-offense',
  templateUrl: './offense.component.html',
  styleUrls: ['./offense.component.scss']
})

export class OffenseComponent implements OnInit { 
  gridWatcher: Subscription | undefined;
  offenseInfoForm!: FormGroup;
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
    this.createFormGroup(this.characterService.getOffenseInfo());

    //angular grid bootstrapping thingy
    this.gridWatcher = this.mediaObserver
      .asObservable()
      .subscribe((change: MediaChange[]) => {
          console.log(change[0].mqAlias);
          this.cols = this.colMap.get(change[0].mqAlias) as number;
        });
  }

  createFormGroup(offenseInfo: OffenseInfo): void{
    this.offenseInfoForm = new FormGroup({
      initiativeTotal: new FormControl(offenseInfo.initiativeTotal),
      initiativeDexMod: new FormControl(offenseInfo.initiativeDexMod),
      initiativeMiscMod: new FormControl(offenseInfo.initiativeMiscMod),
      baseAttackBonus: new FormControl(offenseInfo.baseAttackBonus),
      cmbTotal: new FormControl(offenseInfo.cmbTotal),
      cmbStrMod: new FormControl(offenseInfo.cmbStrMod),
      cmbSizeMod: new FormControl(offenseInfo.cmbSizeMod),
      cmbMiscMod: new FormControl(offenseInfo.cmbMiscMod),
      cmbTempMod: new FormControl(offenseInfo.cmbTempMod),
      weapons: new FormArray([])
    });
  }

}
