import { Equipment, acTypeEnum } from './../../../../../../libs/character-classes/equipment';
import { DexScore } from './../../../../../../libs/character-classes/abilities';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CharacterDataService } from '../../services/character-data.service';
import { CombatInfo } from '../../../../../../libs/character-classes/combat-info';
import { Subscription, debounceTime, Subject, Observable, first, takeUntil } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { maxNumberValidator } from '../../functions/validators';

import { WeaponComponent } from '../weapon/weapon.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Character } from 'libs/character-classes/character';
import { Weapon } from 'libs/character-classes/weapon';
import { AcItem } from 'libs/character-classes/equipment';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})

export class CombatComponent implements OnInit {
  gridWatcher: Subscription | undefined;
  sizeMod: number | undefined;
  character$: Observable<Character>;
  combat_infoForm: FormGroup;
  weaponForm: FormGroup;
  counter = 0;
  acDexScore = 0;
  acArmor = 0;
  acShield = 0;
  destroy$ = new Subject<void>();

  cols = 1;
  weaponObjectHeight = '15em';
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  changesUnsubscribe = new Subject<void>();

  constructor(
    private store: CharacterDataService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.combat_infoForm = this.initCombatForm();
    this.weaponForm = this.initWeaponForm();

    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.weaponForm = this.initWeaponForm();
      this.calculateAcDexMod(char.abilities.dex.useMod, char.equipment.ac_items);
      this.calculateArmorAndShield(char.equipment.ac_items);
      char.combat_info.getCombatInfoTotals(char.abilities, this.acDexScore, this.acArmor, this.acShield);
      this.setFormGroup(char.combat_info);
      this.setWeaponArray(char.combat_info.weapons);
    });

    //combat form change listener
    this.combat_infoForm.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!this.combat_infoForm?.valid) {
        return;
      }
      this.store.updateCombatInfo(info, this.acDexScore, this.acArmor, this.acShield);
    });


    //angular grid bootstrapping thingy
    this.breakpointObserver.observe(['(min-width:992px)'])
      .subscribe((state: BreakpointState) => {
        state.matches ? this.cols = 2 : this.cols = 1;
      });

    this.breakpointObserver.observe(['(min-width:768px)'])
      .subscribe((state: BreakpointState) => {
        state.matches ? this.weaponObjectHeight = '15em' : this.weaponObjectHeight = '20em';
      });
  }

  fixTheOutlines() {
    setTimeout(() => this.formFields.forEach(ff => {
      ff.updateOutlineGap()
    }), 100);
  }

  initCombatForm(): FormGroup {
    return this.fb.group({
      bab: ['', maxNumberValidator()],
      hpTotal: ['', maxNumberValidator()],
      hpCurrent: ['', maxNumberValidator()],
      hpNonLethal: ['', maxNumberValidator()],
      spellResistance: ['', maxNumberValidator()],
      damageReduction: ['', maxNumberValidator()],
      initiativeMiscMod: ['', maxNumberValidator()],
      cmbMiscMod: ['', maxNumberValidator()],
      cmdMiscMod: ['', maxNumberValidator()],
      acNaturalArmorMod: ['', maxNumberValidator()],
      acDeflectMod: ['', maxNumberValidator()],
      acMiscMod: ['', maxNumberValidator()],
    });
  }

  initWeaponForm(): FormGroup {
    return this.fb.group({
      weapons: this.fb.array([])
    });
  }

  setFormGroup(info: CombatInfo) {
    this.combat_infoForm.patchValue(info, { emitEvent: false });
  }

  calculateAcDexMod(dex: number | undefined, ac_items: AcItem[]) {
    if (dex === undefined || ac_items === undefined) {
      return;
    }
    let max_dex = dex ?? 0;
    ac_items.forEach(item => {
      if (item.equipped && item.max_dex && item.max_dex < max_dex) {
        max_dex = item.max_dex;
      }
    });
    this.acDexScore = max_dex;
  }

  calculateArmorAndShield(ac_items: AcItem[]) {
    if (ac_items === undefined) {
      return;
    }
    ac_items.forEach(item => {
      if (item.equipped) {
        //note: bonuses don't stack take the highest ac bonus from your equipment for shield and ac and apply it
        if (item.type == acTypeEnum.shield) {
          this.acShield < (item.bonus ?? 0) ? this.acShield = (item.bonus ?? 0) : this.acShield;
        }
        else {
          this.acArmor < (item.bonus ?? 0) ? this.acArmor = (item.bonus ?? 0) : this.acArmor;
        }
      }
    });
  }


  //weapons ---------------------------------------------------------
  setWeaponArray(weapons: Weapon[]) {
    if (weapons === undefined) {
      return;
    }
    weapons.map(weapon => {
      this.weaponArray.push(this.getWeaponFormGroup(weapon));
    })

    //wepon form change listener
    this.weaponForm.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!this.weaponForm?.valid) {
        return;
      }
      this.store.updateWeapons(info.weapons);
    });
  }

  get weaponArray(): FormArray {
    return this.weaponForm?.get('weapons') as FormArray;
  }

  get weaponArrayControls() {
    return (this.weaponForm?.get('weapons') as FormArray).controls;
  }

  addWeapon() {
    this.weaponArray.push(WeaponComponent.createWeapon());
  }

  deleteWeapon(index: number) {
    this.weaponArray.removeAt(index);
  }

  getWeaponFormGroup(weapon: Weapon) {
    return this.fb.group({
      name: this.fb.control(weapon.name, Validators.maxLength(50)),
      attackBonus: this.fb.control(weapon.attackBonus, Validators.maxLength(10)),
      critical: this.fb.control(weapon.critical, Validators.maxLength(10)),
      type: this.fb.control(weapon.type, Validators.maxLength(10)),
      weight: this.fb.control(weapon.weight, Validators.maxLength(10)),
      range: this.fb.control(weapon.range, Validators.maxLength(10)),
      ammunition: this.fb.control(weapon.ammunition, Validators.maxLength(10)),
      damage: this.fb.control(weapon.damage, Validators.maxLength(10))
    });
  }
  //------------------------------------------------------------------------------
}

