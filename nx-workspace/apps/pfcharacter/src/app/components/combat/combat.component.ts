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
import { checkValidForm } from '../../functions/check-valid-form';
import { strUnToNum } from '../../functions/methods';

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
  abilities!: Abilities;
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
    private fb: FormBuilder) {}


  ngOnInit(): void {
    console.log(this.characterService.character.abilities);
    this.combatInfo = this.characterService.character.combatInfo;
    this.abilities = this.characterService.character.abilities;
    this.calculateTotals(this.combatInfo, this.abilities);
    this.createFormGroup(this.combatInfo);

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

    this.combatInfoForm.get('hpMiscForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!checkValidForm(this.combatInfoForm, 'hpMiscForm')){
        return;
      }
      this.updateHpMisc(info);
    });

    this.combatInfoForm.get('offenseForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info =>{
      if(!checkValidForm(this.combatInfoForm, 'offenseForm')){
        return;
      }
      this.updateOffense(info);
    });

    this.combatInfoForm.get('acForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info =>{
      if(!checkValidForm(this.combatInfoForm, 'acForm')){
        return;
      }
      this.updateAcInfo(info);
    });
  }

  fixTheOutlines(){
    setTimeout(()=> this.formFields.forEach(ff =>{
      ff.updateOutlineGap()}), 100);
  }

  createFormGroup(combatInfo: CombatInfo): void{
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
        initiativeMiscMod: [combatInfo.initiativeMiscMod, maxNumberValidator()],
        cmbMiscMod: [combatInfo.cmbMiscMod, maxNumberValidator()],
        cmdMiscMod: [combatInfo.cmdMiscMod, maxNumberValidator()],
      }),
      acForm: this.fb.group({
        acNaturalArmorMod: [combatInfo.acNaturalArmorMod, maxNumberValidator()],
        acDeflectMod: [combatInfo.acDeflectMod, maxNumberValidator()],
        acMiscMod: [combatInfo.acMiscMod, maxNumberValidator()],
      }),

      weapons: new FormArray([])
    });
  }
  
  updateBabInfo(info: CombatInfo){
    this.combatInfo.bab = info.bab;
    this.combatInfo.cmbTotal = this.getCmbTotal(this.combatInfo, this.abilities);
    this.combatInfo.cmdTotal = this.getCmdTotal(this.combatInfo, this.abilities);
    this.characterService.updateBab(this.combatInfo);
  }

  updateHpMisc(info: CombatInfo){
    this.combatInfo.hpTotal = info.hpTotal;
    this.combatInfo.hpCurrent = info.hpCurrent;
    this.combatInfo.hpNonLethal = info.hpNonLethal;
    this.combatInfo.spellResistance = info.spellResistance;
    this.combatInfo.damageReduction = info.damageReduction;
    this.characterService.updateHpMisc(this.combatInfo);
  }

  updateOffense(info: CombatInfo){
    this.combatInfo.initiativeMiscMod = info.initiativeMiscMod;
    this.combatInfo.cmbMiscMod = info.cmbMiscMod;
    this.combatInfo.cmdMiscMod = info.cmdMiscMod;
    this.combatInfo.cmbTotal = this.getCmbTotal(this.combatInfo, this.abilities);
    this.combatInfo.cmdTotal = this.getCmdTotal(this.combatInfo, this.abilities);
    this.combatInfo.initiativeTotal = this.getInitiativeTotal(this.combatInfo, this.abilities);
    this.characterService.updateOffense(info);
  }

  updateAcInfo(info: CombatInfo){
    this.combatInfo.acNaturalArmorMod = info.acNaturalArmorMod;
    this.combatInfo.acDeflectMod = info.acDeflectMod;
    this.combatInfo.acMiscMod = info.acMiscMod;
    this.combatInfo.acTotal = this.getAcTotal(this.combatInfo, this.abilities);
    this.combatInfo.acTouch = this.getAcTouchTotal(this.combatInfo, this.abilities);
    this.combatInfo.acFlat = this.getAcFlatTotal(this.combatInfo);
    this.characterService.updateAc(info);
  }

  calculateTotals(combatInfo: CombatInfo, abilities: Abilities){
    this.combatInfo.initiativeTotal = this.getInitiativeTotal(combatInfo, abilities);
    this.combatInfo.cmbTotal = this.getCmbTotal(combatInfo, abilities);
    this.combatInfo.cmdTotal = this.getCmdTotal(combatInfo, abilities);
    this.combatInfo.acTotal = this.getAcTotal(combatInfo, abilities);
    this.combatInfo.acTouch = this.getAcTouchTotal(combatInfo, abilities);
    this.combatInfo.acFlat = this.getAcFlatTotal(combatInfo);
  }



  //totals-------
  getCmbTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    const total = 
    strUnToNum(combatInfo.bab) + 
    strUnToNum(abilities.useStrMod) + 
    strUnToNum(combatInfo.cmSizeMod) + 
    strUnToNum(combatInfo.cmbMiscMod);
    return total; 
  }

  getCmdTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    console.log(combatInfo, abilities);
    const total = 
    strUnToNum(combatInfo.bab) + 
    strUnToNum(abilities.useStrMod) + 
    strUnToNum(abilities.useDexMod) + 
    strUnToNum(combatInfo.cmSizeMod) + 
    strUnToNum(combatInfo.cmdMiscMod) + 10;
    return total;
  }

  getInitiativeTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    const total =  
    strUnToNum(abilities.useDexMod) +  
    strUnToNum(combatInfo.initiativeMiscMod);
    return total;
  }

  getAcTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    const total = 
    strUnToNum(combatInfo.acArmorMod) + 
    strUnToNum(combatInfo.acShieldMod) + 
    strUnToNum(abilities.useDexMod) + 
    strUnToNum(combatInfo.acSizeMod) + 
    strUnToNum(combatInfo.acNaturalArmorMod) +
    strUnToNum(combatInfo.acDeflectMod) + 
    strUnToNum(combatInfo.acMiscMod) + 10;
    return total;
  }

  getAcTouchTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    const total = 
    strUnToNum(abilities.useDexMod) + 
    strUnToNum(combatInfo.acDeflectMod) + 
    strUnToNum(combatInfo.acSizeMod) + 
    strUnToNum(combatInfo.acMiscMod) + 10;
    return total;
  }

  getAcFlatTotal(combatInfo: CombatInfo): number{
    const total = 
    strUnToNum(combatInfo.acArmorMod) + 
    strUnToNum(combatInfo.acShieldMod) + 
    strUnToNum(combatInfo.acSizeMod) + 
    strUnToNum(combatInfo.acNaturalArmorMod) +
    strUnToNum(combatInfo.acDeflectMod) + 
    strUnToNum(combatInfo.acMiscMod) + 10;
    return total;
  }
}
