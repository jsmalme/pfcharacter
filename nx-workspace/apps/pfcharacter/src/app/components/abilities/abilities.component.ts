/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Abilities } from '../../../../../../libs/character-classes/abilities';
import { CharacterService } from '../../services/character.service';
import { debounceTime } from 'rxjs';
import { SavingThrows } from '../../../../../../libs/character-classes/saving-throws';
import {MatFormField} from '@angular/material/form-field';
import { maxNumberValidator } from '../../functions/max-number-validator';

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

  constructor(public characterService: CharacterService) { 
    this.abilities = characterService.character.abilities;
    this.savingThrows = characterService.character.savingThrows;
  }

  ngOnInit(): void {
    this.createAbilitiesFormGroup(this.abilities);
    this.createSavingThrowFormGroup(this.savingThrows);

    //abilities change listeners
    this.abilitiesForm.get('strForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.abilitiesForm, 'strForm')){
        return;
      }
      this.updateStrModifiers(info);
    });
    this.abilitiesForm.get('dexForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.abilitiesForm, 'dexForm')){
        return;
      }
      this.updateDexModifiers(info);
    });
    this.abilitiesForm.get('conForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.abilitiesForm, 'conForm')){
        return;
      }
      this.updateConModifiers(info);
    });
    this.abilitiesForm.get('intForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.abilitiesForm, 'intForm')){
        return;
      }
      this.updateIntModifiers(info);
    });
    this.abilitiesForm.get('wisForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.abilitiesForm, 'wisForm')){
        return;
      }
      this.updateWisModifiers(info);
    });
    this.abilitiesForm.get('chaForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.abilitiesForm, 'chaForm')){
        return;
      }
      this.updateChaModifiers(info);
    });

    //saving throw change listeners
    this.savingThrowsForm.get('forForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.savingThrowsForm, 'forForm')){
        return;
      }
      info.forAbility = this.savingThrows.for.forAbility;
      this.savingThrows.for = info;
      this.updateForTotal();
    });

    this.savingThrowsForm.get('refForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.savingThrowsForm, 'refForm')){
        return;
      }
      info.refAbility = this.savingThrows.ref.refAbility;
      this.savingThrows.ref = info;
      this.updateRefTotal();
    });

    this.savingThrowsForm.get('willForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.checkValidForm(this.savingThrowsForm, 'willForm')){
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

  updateStrModifiers(info: any) {
    this.abilities.str = info.str;
    this.abilities.strTempAdj = info.strTempAdj;
    this.abilities.strMod = this.calculateAbilityScore(info.str);
    this.abilities.strTempMod = this.calculateAbilityScore(info.strTempAdj);
    //this.characterService.updateStr()
  }
  
  updateDexModifiers(info: any){
    this.abilities.dex = info.dex;
    this.abilities.dexTempAdj = info.dexTempAdj;
    this.abilities.dexMod = this.calculateAbilityScore(info.dex);
    this.abilities.dexTempMod = this.calculateAbilityScore(info.dexTempAdj);
    this.savingThrows.ref.refAbility = info.dexTempAdj ? this.abilities.dexTempMod : (info.dex ? this.abilities.dexMod : undefined);
    this.updateRefTotal();
    //this.characterService.updateDex(info);
  }

  updateConModifiers(info: any){
    this.abilities.con = info.con;
    this.abilities.conTempAdj = info.conTempAdj;
    this.abilities.conMod = this.calculateAbilityScore(info.con);
    this.abilities.conTempMod = this.calculateAbilityScore(info.conTempAdj);
    this.savingThrows.for.forAbility = info.conTempAdj ? this.abilities.conTempMod : (info.con ? this.abilities.conMod : undefined);
    this.updateForTotal();
    //this.characterService.updateCon(info);
  }

  updateIntModifiers(info: any){
    this.abilities.int = info.int;
    this.abilities.intTempAdj = info.intTempAdj;
    this.abilities.intMod = this.calculateAbilityScore(info.int);
    this.abilities.intTempMod = this.calculateAbilityScore(info.intTempAdj);
    //this.characterService.updateInt(info);
  }

  updateWisModifiers(info: any){
    this.abilities.wis = info.wis;
    this.abilities.wisTempAdj = info.wisTempAdj;
    this.abilities.wisMod = this.calculateAbilityScore(info.wis);
    this.abilities.wisTempMod = this.calculateAbilityScore(info.wisTempAdj);
    this.savingThrows.will.willAbility = info.wisTempAdj ? this.abilities.wisTempMod : (info.wis ? this.abilities.wisMod : undefined);
    this.updateWillTotal();
    //this.characterService.updateWis(info);
  }

  updateChaModifiers(info: any){
    this.abilities.cha = info.cha;
    this.abilities.chaTempAdj = info.chaTempAdj;
    this.abilities.chaMod = this.calculateAbilityScore(info.cha);
    this.abilities.chaTempMod = this.calculateAbilityScore(info.chaTempAdj);
    //this.characterService.updateCha(info);
  }

  createAbilitiesFormGroup(abilities: Abilities): void {
    this.abilitiesForm = new FormGroup({
      strForm: new FormGroup({
        str: new FormControl(abilities.str, maxNumberValidator()),
        strTempAdj: new FormControl(abilities.strTempAdj, maxNumberValidator()),
      }),
      dexForm: new FormGroup({
        dex: new FormControl(abilities.dex, maxNumberValidator()),
        dexTempAdj: new FormControl(abilities.dexTempAdj, maxNumberValidator()),
      }),
      conForm: new FormGroup({
        con: new FormControl(abilities.con, maxNumberValidator()),
        conTempAdj: new FormControl(abilities.conTempAdj, maxNumberValidator()),
      }),
      intForm: new FormGroup({
        int: new FormControl(abilities.int, maxNumberValidator()),
        intTempAdj: new FormControl(abilities.intTempAdj, maxNumberValidator()),
      }),
      wisForm: new FormGroup({
        wis: new FormControl(abilities.wis, maxNumberValidator()),
        wisTempAdj: new FormControl(abilities.wisTempAdj, maxNumberValidator()),
      }),
      chaForm: new FormGroup({
        cha: new FormControl(abilities.cha, maxNumberValidator()),
        chaTempAdj: new FormControl(abilities.chaTempAdj, maxNumberValidator()),
      })
    });
  }

  createSavingThrowFormGroup(savingThrows: SavingThrows): void {
    this.savingThrowsForm = new FormGroup({
      forForm: new FormGroup({
        forBase: new FormControl(savingThrows.for.forBase, maxNumberValidator()),
        forAbility: new FormControl({value: savingThrows.for.forAbility, disabled: true}),
        forMagic: new FormControl(savingThrows.for.forMagic, maxNumberValidator()),
        forMisc: new FormControl(savingThrows.for.forMisc, maxNumberValidator()),
        forTemp: new FormControl(savingThrows.for.forTemp, maxNumberValidator()),
        forOther: new FormControl(savingThrows.for.forOther, maxNumberValidator()),
      }),
      refForm: new FormGroup({
        refBase: new FormControl(savingThrows.ref.refBase, maxNumberValidator()),
        refAbility: new FormControl({value: savingThrows.ref.refAbility, disabled: true}),
        refMagic: new FormControl(savingThrows.ref.refMagic, maxNumberValidator()),
        refMisc: new FormControl(savingThrows.ref.refMisc, maxNumberValidator()),
        refTemp: new FormControl(savingThrows.ref.refTemp, maxNumberValidator()),
        refOther: new FormControl(savingThrows.ref.refOther, maxNumberValidator()),
      }),
      willForm: new FormGroup({        
        willBase: new FormControl(savingThrows.will.willBase, maxNumberValidator()),
        willAbility: new FormControl({value: savingThrows.will.willAbility, disabled: true}),
        willMagic: new FormControl(savingThrows.will.willMagic, maxNumberValidator()),
        willMisc: new FormControl(savingThrows.will.willMisc, maxNumberValidator()),
        willTemp: new FormControl(savingThrows.will.willTemp, maxNumberValidator()),
        willOther: new FormControl(savingThrows.will.willOther, maxNumberValidator()),
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

  checkValidForm(parentForm: FormGroup, subForm: string){
    if(!parentForm.get(subForm)?.valid){
      return false;
    }
    return true;
  }
}
