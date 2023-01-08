/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Abilities, ChaScore, ConScore, DexScore, IntScore, StrScore, WisScore } from '../../../../../../libs/character-classes/abilities';
import { CharacterService } from '../../services/character.service';
import { debounceTime } from 'rxjs';
import { SavingThrows } from '../../../../../../libs/character-classes/saving-throws';
import { MatFormField } from '@angular/material/form-field';
import { maxNumberValidator } from '../../functions/validators';
import { checkValidForm } from '../../functions/check-valid-form';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent implements OnInit {
  abilitiesForm!: FormGroup;
  savingThrowsForm!: FormGroup;
  abilities!: Abilities; 
  savingThrows!: SavingThrows;
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;

  constructor(public characterService: CharacterService,
    private fb: FormBuilder) { 
    this.abilities = characterService.character.abilities;
    this.savingThrows = characterService.character.savingThrows;
  }

  ngOnInit(): void {
    this.createAbilitiesFormGroup(this.abilities);
    this.createSavingThrowFormGroup(this.savingThrows);

    //abilities change listeners
    this.abilitiesForm.get('strForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.abilitiesForm, 'strForm')){
        return;
      }
      this.updateStrModifiers(info);
    });
    this.abilitiesForm.get('dexForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.abilitiesForm, 'dexForm')){
        return;
      }
      this.updateDexModifiers(info);
    });
    this.abilitiesForm.get('conForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.abilitiesForm, 'conForm')){
        return;
      }
      this.updateConModifiers(info);
    });
    this.abilitiesForm.get('intForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.abilitiesForm, 'intForm')){
        return;
      }
      this.updateIntModifiers(info);
    });
    this.abilitiesForm.get('wisForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.abilitiesForm, 'wisForm')){
        return;
      }
      this.updateWisModifiers(info);
    });
    this.abilitiesForm.get('chaForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.abilitiesForm, 'chaForm')){
        return;
      }
      this.updateChaModifiers(info);
    });

    //saving throw change listeners
    this.savingThrowsForm.get('forForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.savingThrowsForm, 'forForm')){
        return;
      }
      info.forAbility = this.savingThrows.for.forAbility;
      this.savingThrows.for = info;
      this.updateForTotal();
    });

    this.savingThrowsForm.get('refForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.savingThrowsForm, 'refForm')){
        return;
      }
      info.refAbility = this.savingThrows.ref.refAbility;
      this.savingThrows.ref = info;
      this.updateRefTotal();
    });

    this.savingThrowsForm.get('willForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.savingThrowsForm, 'willForm')){
        return;
      }
      info.willAbility = this.savingThrows.will.willAbility;
      this.savingThrows.will = info;
      this.updateWillTotal();
    });
  }

  fixTheOutlines(){
    setTimeout(()=> this.formFields.forEach(ff =>{
      ff.updateOutlineGap()}), 100);
  }

  updateStrModifiers(info: StrScore) {
    this.abilities.str = info.str;
    this.abilities.strTempAdj = info.strTempAdj;
    this.abilities.strMod = this.calculateAbilityScore(info.str);
    this.abilities.strTempMod = this.calculateAbilityScore(info.strTempAdj);
    this.abilities.useStrMod = info.strTempAdj ? this.abilities.strTempMod : (info.str ? this.abilities.strMod : undefined);
    this.characterService.updateStr(this.abilities);
    //this.characterService.updateStr(info);
  }
  
  updateDexModifiers(info: DexScore){
    this.abilities.dex = info.dex;
    this.abilities.dexTempAdj = info.dexTempAdj;
    this.abilities.dexMod = this.calculateAbilityScore(info.dex);
    this.abilities.dexTempMod = this.calculateAbilityScore(info.dexTempAdj);
    this.abilities.useDexMod = info.dexTempAdj ? this.abilities.dexTempMod : (info.dex ? this.abilities.dexMod : undefined);
    this.savingThrows.ref.refAbility = this.abilities.useDexMod;
    this.characterService.updateDex(this.abilities);
    this.updateRefTotal();
  }

  updateConModifiers(info: ConScore){
    this.abilities.con = info.con;
    this.abilities.conTempAdj = info.conTempAdj;
    this.abilities.conMod = this.calculateAbilityScore(info.con);
    this.abilities.conTempMod = this.calculateAbilityScore(info.conTempAdj);
    this.abilities.useConMod = info.conTempAdj ? this.abilities.conTempMod : (info.con ? this.abilities.conMod : undefined);
    this.savingThrows.for.forAbility = this.abilities.useConMod;
    this.characterService.updateCon(this.abilities);
    this.updateForTotal();
  }

  updateIntModifiers(info: IntScore){
    this.abilities.int = info.int;
    this.abilities.intTempAdj = info.intTempAdj;
    this.abilities.intMod = this.calculateAbilityScore(info.int);
    this.abilities.intTempMod = this.calculateAbilityScore(info.intTempAdj);
    this.abilities.useIntMod = info.intTempAdj ? this.abilities.intTempMod : (info.int ? this.abilities.intMod : undefined);
    this.characterService.updateInt(this.abilities);
  }

  updateWisModifiers(info: WisScore){
    this.abilities.wis = info.wis;
    this.abilities.wisTempAdj = info.wisTempAdj;
    this.abilities.wisMod = this.calculateAbilityScore(info.wis);
    this.abilities.wisTempMod = this.calculateAbilityScore(info.wisTempAdj);
    this.abilities.useWisMod = info.wisTempAdj ? this.abilities.wisTempMod : (info.wis ? this.abilities.wisMod : undefined);
    this.savingThrows.will.willAbility = this.abilities.useWisMod;
    this.characterService.updateWis(this.abilities);
    this.updateWillTotal();
    //this.characterService.updateWis(info);
  }

  updateChaModifiers(info: ChaScore){
    this.abilities.cha = info.cha;
    this.abilities.chaTempAdj = info.chaTempAdj;
    this.abilities.chaMod = this.calculateAbilityScore(info.cha);
    this.abilities.chaTempMod = this.calculateAbilityScore(info.chaTempAdj);
    this.abilities.useChaMod = info.chaTempAdj ? this.abilities.chaTempMod : (info.cha ? this.abilities.chaMod : undefined);
    this.characterService.updateCha(this.abilities);
    //this.characterService.updateCha(info);
  }

  createAbilitiesFormGroup(abilities: Abilities): void {
    this.abilitiesForm = this.fb.group({
      strForm: this.fb.group({
        str: [abilities.str, maxNumberValidator()],
        strTempAdj: [abilities.strTempAdj, maxNumberValidator()],
      }),
      dexForm: this.fb.group({
        dex: [abilities.dex, maxNumberValidator()],
        dexTempAdj: [abilities.dexTempAdj, maxNumberValidator()],
      }),
      conForm: this.fb.group({
        con: [abilities.con, maxNumberValidator()],
        conTempAdj: [abilities.conTempAdj, maxNumberValidator()],
      }),
      intForm: this.fb.group({
        int: [abilities.int, maxNumberValidator()],
        intTempAdj: [abilities.intTempAdj, maxNumberValidator()],
      }),
      wisForm: this.fb.group({
        wis: [abilities.wis, maxNumberValidator()],
        wisTempAdj: [abilities.wisTempAdj, maxNumberValidator()],
      }),
      chaForm: this.fb.group({
        cha: [abilities.cha, maxNumberValidator()],
        chaTempAdj: [abilities.chaTempAdj, maxNumberValidator()],
      })
    });
  }

  createSavingThrowFormGroup(savingThrows: SavingThrows): void {
    this.savingThrowsForm = this.fb.group({
      forForm: this.fb.group({
        forBase: [savingThrows.for.forBase, maxNumberValidator()],
        forMagic: [savingThrows.for.forMagic, maxNumberValidator()],
        forMisc: [savingThrows.for.forMisc, maxNumberValidator()],
        forTemp: [savingThrows.for.forTemp, maxNumberValidator()],
        forOther: [savingThrows.for.forOther, maxNumberValidator()],
      }),
      refForm: this.fb.group({
        refBase: [savingThrows.ref.refBase, maxNumberValidator()],
        refMagic: [savingThrows.ref.refMagic, maxNumberValidator()],
        refMisc: [savingThrows.ref.refMisc, maxNumberValidator()],
        refTemp: [savingThrows.ref.refTemp, maxNumberValidator()],
        refOther: [savingThrows.ref.refOther, maxNumberValidator()],
      }),
      willForm: this.fb.group({        
        willBase: [savingThrows.will.willBase, maxNumberValidator()],
        willMagic: [savingThrows.will.willMagic, maxNumberValidator()],
        willMisc: [savingThrows.will.willMisc, maxNumberValidator()],
        willTemp: [savingThrows.will.willTemp, maxNumberValidator()],
        willOther: [savingThrows.will.willOther, maxNumberValidator()],
      })
    });
  }
  

  private updateForTotal(){
    this.savingThrows.for.forTotal =  +(this.savingThrows.for?.forBase || 0) + 
    +(this.savingThrows.for?.forAbility || 0) + 
    +(this.savingThrows.for?.forMagic || 0) + 
    +(this.savingThrows.for?.forMisc || 0) +
    +(this.savingThrows.for?.forTemp || 0) + 
    +(this.savingThrows.for?.forOther || 0);
  }

  private updateRefTotal(){
    this.savingThrows.ref.refTotal =  +(this.savingThrows.ref?.refBase || 0) + 
    +(this.savingThrows.ref?.refAbility || 0) + 
    +(this.savingThrows.ref?.refMagic || 0) + 
    +(this.savingThrows.ref?.refMisc || 0) +
    +(this.savingThrows.ref?.refTemp || 0) + 
    +(this.savingThrows.ref?.refOther || 0);
  }

  private updateWillTotal(){
    this.savingThrows.will.willTotal =  +(this.savingThrows.will?.willBase || 0) + 
    +(this.savingThrows.will?.willAbility || 0) + 
    +(this.savingThrows.will?.willMagic || 0) + 
    +(this.savingThrows.will?.willMisc || 0) +
    +(this.savingThrows.will?.willTemp || 0) + 
    +(this.savingThrows.will?.willOther || 0);
  }

  calculateAbilityScore(score: number | undefined){
    if(score === undefined || ""){
      return undefined;
    }
    return Math.floor((score - 10)/2);
  }
}
