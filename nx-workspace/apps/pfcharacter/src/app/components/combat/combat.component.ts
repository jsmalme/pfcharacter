/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { CombatInfo } from '../../../../../../libs/character-classes/combat-info';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription, debounceTime } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { maxNumberValidator } from '../../functions/max-number-validator';
import { Abilities } from '../../../../../../libs/character-classes/abilities';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})

export class CombatComponent implements OnInit { 
  gridWatcher: Subscription | undefined;
  sizeMod: number | undefined;
  combatInfoForm!: FormGroup;
  combatInfo!: CombatInfo;
  cols: number | undefined = 2;
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;

  colMap = new Map([
    ['xs', 1],
    ['sm', 1],
    ['md', 2],
    ['lg', 2],
    ['xl', 2]
  ]);

  constructor(private characterService: CharacterService,
    private mediaObserver: MediaObserver,
    private fb: FormBuilder) {
      this.combatInfo = characterService.character.combatInfo;
    }


  ngOnInit(): void {
    this.createFormGroup(this.combatInfo, this.characterService.character.abilities);

    //angular grid bootstrapping thingy
    this.gridWatcher = this.mediaObserver.asObservable()
      .subscribe((change: MediaChange[]) => {
          this.cols = this.colMap.get(change[0].mqAlias) as number;
        });

    //combat form change listeners
    this.combatInfoForm.get('hpMiscForm')?.get('babForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.combatInfoForm.get('hpMiscForm')?.get('babForm')?.valid){
        return;
      }
      this.updateBabInfo(info);
    });
  }

  fixTheOutlines(){
    setTimeout(()=> this.formFields.forEach(ff =>{
      ff.updateOutlineGap()}), 100);
  }

  createFormGroup(combatInfo: CombatInfo, abilities: Abilities): void{
    this.combatInfoForm = this.fb.group({
      hpMiscForm: this.fb.group({
        babForm: this.fb.group({
          bab: [combatInfo.bab, maxNumberValidator()],
        }),
        hpTotal: [combatInfo.hpTotal, maxNumberValidator()],
        hpCurrent: [combatInfo.hpCurrent, maxNumberValidator()],
        hpNonLethal: [combatInfo.hpNonLethal, maxNumberValidator()],
        spellResistance: [combatInfo.spellResistance, maxNumberValidator()],
        damageReduction: [combatInfo.damageReduction, maxNumberValidator()],
      }),
      offenseForm: this.fb.group({
        initiativeDexMod: [{value: abilities.dexMod, disabled: true}],
        initiativeMiscMod: [combatInfo.initiativeMiscMod, maxNumberValidator()],
        cmbBab: [{value: combatInfo.bab, disabled: true}],
        cmbStrMod: [{value: abilities.strMod, disabled: true}],
        cmbSizeMod: [{value: combatInfo.cmSizeMod, disabled: true}],
        cmbMiscMod: [combatInfo.cmbMiscMod, maxNumberValidator()],
        cmdBab: [{value: combatInfo.bab, disabled: true}],
        cmdStrMod: [{value: abilities.strMod, disabled: true}],
        cmdDexMod: [{value: abilities.dexMod, disabled: true}],
        cmdSizeMod: [{value: combatInfo.cmSizeMod, disabled: true}],
        cmdMiscMod: [combatInfo.cmdMiscMod, maxNumberValidator()],
      }),
      acForm: this.fb.group({
        acArmorMod: [{value: combatInfo.acArmorMod, disabled: true}],
        acShieldMod: [{value: combatInfo.acShieldMod, disabled: true}],
        acDexMod: [{value: abilities.dexMod, disabled: true}],
        acSizeMod: [{value: combatInfo.acSizeMod, disabled: true}],
        acNaturalArmorMod: [combatInfo.acNaturalArmorMod, maxNumberValidator()],
        acDeflectMod: [combatInfo.acDeflectMod, maxNumberValidator()],
        acMiscMod: [combatInfo.acMiscMod, maxNumberValidator()],
      }),

      weapons: new FormArray([])
    });
  }
  
  updateBabInfo(info: CombatInfo){
    if(info.bab === undefined){
      this.combatInfo.cmbBabMod = undefined;
      this.combatInfo.cmdBabMod = undefined;
    }
    else{
      this.combatInfo.cmbBabMod = info.bab;
      this.combatInfo.cmdBabMod = info.bab;
      
      console.log(this.combatInfo.cmdBabMod);
    }
  }
}
