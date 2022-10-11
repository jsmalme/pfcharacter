/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { OffenseInfo } from '../../../../../../libs/character-classes/offense-info';

@Component({
  selector: 'app-offense',
  templateUrl: './offense.component.html',
  styleUrls: ['./offense.component.scss']
})
export class OffenseComponent implements OnInit {
  offenseInfoForm!: FormGroup;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.createFormGroup(this.characterService.getOffenseInfo());

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
