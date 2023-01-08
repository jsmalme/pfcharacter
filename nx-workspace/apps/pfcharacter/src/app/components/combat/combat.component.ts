/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { CombatInfo } from '../../../../../../libs/character-classes/combat-info';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription, debounceTime, Subject} from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { maxNumberValidator } from '../../functions/validators';
import { Abilities } from '../../../../../../libs/character-classes/abilities';
import { checkValidForm } from '../../functions/check-valid-form';
import { strUnToNum } from '../../functions/methods';
import { WeaponComponent } from '../weapon/weapon.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  cols = 2;
  weaponObjectHeight = '15em';
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  changesUnsubscribe = new Subject<void>();

  constructor(private characterService: CharacterService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder) {}


  ngOnInit(): void {
    this.combatInfo = this.characterService.character.combatInfo;
    this.abilities = this.characterService.character.abilities;
    this.calculateTotals(this.combatInfo, this.abilities);
    this.createFormGroup(this.combatInfo);

    //angular grid bootstrapping thingy
   this.breakpointObserver.observe(['(min-width:992px)'])
    .subscribe((state: BreakpointState) => {
      state.matches ? this.cols = 2 : this.cols = 1;
    });

    this.breakpointObserver.observe(['(min-width:768px)'])
    .subscribe((state: BreakpointState) => {
      state.matches ? this.weaponObjectHeight = '15em' : this.weaponObjectHeight = '20em';
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

    this.combatInfoForm.get('weapons')?.valueChanges.pipe(debounceTime(1000)).subscribe(info =>{
      if(!checkValidForm(this.combatInfoForm, 'weapons')){
        return;
      }
      this.combatInfo.weapons = info;
      this.characterService.updateWeapons(this.combatInfo);
    })
  }

  fixTheOutlines(){
    setTimeout(()=> this.formFields.forEach(ff =>{
      ff.updateOutlineGap()}), 100);
  }

  onWeaponValueChanged(data: any){
    console.log(data);
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
      weapons: this.getWeaponFormArray()
    });
  }

//weapons ---------------------------------------------------------
  get weaponArray(): FormArray{
    return this.combatInfoForm?.get('weapons') as FormArray;
  }

  addWeapon(){
    this.weaponArray.push(WeaponComponent.createWeapon());
    this.combatInfo.weapons = this.weaponArray.value;
    this.characterService.updateWeapons(this.combatInfo);
  }

  deleteWeapon(index: number){
    this.weaponArray.removeAt(index);
    this.combatInfo.weapons = this.weaponArray.value;
    this.characterService.updateWeapons(this.combatInfo);
  }

  getWeaponFormArray(){
    if (!this.combatInfo.weapons){
      return this.fb.array([]);
    }
    return this.fb.array(
      this.combatInfo.weapons.map(x => this.fb.group({
        name: this.fb.control(x.name, Validators.maxLength(50)),
        attackBonus: this.fb.control(x.attackBonus, Validators.maxLength(10)),
        critical: this.fb.control(x.critical, Validators.maxLength(10)),
        type: this.fb.control(x.type, Validators.maxLength(10)),
        weight: this.fb.control(x.weight, Validators.maxLength(10)),
        range: this.fb.control(x.range, Validators.maxLength(10)),
        ammunition: this.fb.control(x.ammunition, Validators.maxLength(10)),
        damage: this.fb.control(x.damage, Validators.maxLength(10))
      }))
    )
  }
  //----------------------------------------------------------------
//updaters 
  updateWeapons(info: CombatInfo){
    this.combatInfo.acNaturalArmorMod = info.acNaturalArmorMod;
    this.combatInfo.acDeflectMod = info.acDeflectMod;
    this.combatInfo.acMiscMod = info.acMiscMod;
    this.combatInfo.acTotal = this.getAcTotal(this.combatInfo, this.abilities);
    this.combatInfo.acTouch = this.getAcTouchTotal(this.combatInfo, this.abilities);
    this.combatInfo.acFlat = this.getAcFlatTotal(this.combatInfo);
    this.characterService.updateAc(this.combatInfo);
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
    this.characterService.updateOffense(this.combatInfo);
  }

  updateAcInfo(info: CombatInfo){
    this.combatInfo.acNaturalArmorMod = info.acNaturalArmorMod;
    this.combatInfo.acDeflectMod = info.acDeflectMod;
    this.combatInfo.acMiscMod = info.acMiscMod;
    this.combatInfo.acTotal = this.getAcTotal(this.combatInfo, this.abilities);
    this.combatInfo.acTouch = this.getAcTouchTotal(this.combatInfo, this.abilities);
    this.combatInfo.acFlat = this.getAcFlatTotal(this.combatInfo);
    this.characterService.updateAc(this.combatInfo);
  }

  calculateTotals(combatInfo: CombatInfo, abilities: Abilities){
    this.combatInfo.initiativeTotal = this.getInitiativeTotal(combatInfo, abilities);
    this.combatInfo.cmbTotal = this.getCmbTotal(combatInfo, abilities);
    this.combatInfo.cmdTotal = this.getCmdTotal(combatInfo, abilities);
    this.combatInfo.acTotal = this.getAcTotal(combatInfo, abilities);
    this.combatInfo.acTouch = this.getAcTouchTotal(combatInfo, abilities);
    this.combatInfo.acFlat = this.getAcFlatTotal(combatInfo);
  }



  //totals-----------------------------------------------------------
  getCmbTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    const total = 
    strUnToNum(combatInfo.bab) + 
    strUnToNum(abilities.useStrMod) + 
    strUnToNum(combatInfo.cmSizeMod) + 
    strUnToNum(combatInfo.cmbMiscMod);
    return total; 
  }

  getCmdTotal(combatInfo: CombatInfo, abilities: Abilities): number{
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

