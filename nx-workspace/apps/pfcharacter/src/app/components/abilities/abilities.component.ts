/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Observable } from 'rxjs';
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Abilities, ChaScore, ConScore, DexScore, IntScore, StrScore, WisScore } from '../../../../../../libs/character-classes/abilities';
import { CharacterDataService } from '../../services/character-data.service';
import { debounceTime } from 'rxjs';
import { SavingThrows } from '../../../../../../libs/character-classes/saving-throws';
import { MatFormField } from '@angular/material/form-field';
import { maxNumberValidator } from '../../functions/validators';
import { checkValidForm } from '../../functions/check-valid-form';
import { Character } from 'libs/character-classes/character';

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
  character$: Observable<Character>;
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;

  constructor(public store: CharacterDataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.abilitiesForm = this.initAbilitiesForm();
    this.savingThrowsForm = this.initSavingThrowForm();
    this.character$ = this.store.characterUpdate$;
    this.character$.subscribe((char: Character) => {
      this.setAbilitiesForm(char.abilities);
      this.setSavingThrowsForm(char.savingThrows);
    });

    //abilities change listeners
    this.abilitiesForm.get('strForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.abilitiesForm, 'strForm')) {
        return;
      }
      this.store.updateStr(info);
    });
    this.abilitiesForm.get('dexForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.abilitiesForm, 'dexForm')) {
        return;
      }
      this.store.updateDex(info);
    });
    this.abilitiesForm.get('conForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.abilitiesForm, 'conForm')) {
        return;
      }
      this.store.updateCon(info);
    });
    this.abilitiesForm.get('intForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.abilitiesForm, 'intForm')) {
        return;
      }
      this.store.updateInt(info);
    });
    this.abilitiesForm.get('wisForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.abilitiesForm, 'wisForm')) {
        return;
      }
      this.store.updateWis(info);
    });
    this.abilitiesForm.get('chaForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.abilitiesForm, 'chaForm')) {
        return;
      }
      this.store.updateCha(info);
    });

    //saving throw change listeners
    this.savingThrowsForm.get('forForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.savingThrowsForm, 'forForm')) {
        return;
      }
      this.store.updateSavingThrows(info, 'FOR');
    });

    this.savingThrowsForm.get('refForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.savingThrowsForm, 'refForm')) {
        return;
      }
      this.store.updateSavingThrows(info, 'REF');
    });

    this.savingThrowsForm.get('willForm')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!checkValidForm(this.savingThrowsForm, 'willForm')) {
        return;
      }
      this.store.updateSavingThrows(info, 'WILL');
    });
  }

  fixTheOutlines() {
    setTimeout(() => this.formFields.forEach(ff => {
      ff.updateOutlineGap()
    }), 100);
  }

  initAbilitiesForm(): FormGroup {
    return this.fb.group({
      strForm: this.fb.group({
        ability: ['', maxNumberValidator()],
        tempAdj: ['', maxNumberValidator()],
      }),
      dexForm: this.fb.group({
        ability: ['', maxNumberValidator()],
        tempAdj: ['', maxNumberValidator()],
      }),
      conForm: this.fb.group({
        ability: ['', maxNumberValidator()],
        tempAdj: ['', maxNumberValidator()],
      }),
      intForm: this.fb.group({
        ability: ['', maxNumberValidator()],
        tempAdj: ['', maxNumberValidator()],
      }),
      wisForm: this.fb.group({
        ability: ['', maxNumberValidator()],
        tempAdj: ['', maxNumberValidator()],
      }),
      chaForm: this.fb.group({
        ability: ['', maxNumberValidator()],
        tempAdj: ['', maxNumberValidator()],
      })
    });
  }

  setAbilitiesForm(abilities: Abilities) {
    this.abilitiesForm.patchValue({
      strForm: {
        ability: abilities.str.ability,
        tempAdj: abilities.str.tempAdj
      },
      dexForm: {
        ability: abilities.dex.ability,
        tempAdj: abilities.dex.tempAdj
      },
      conForm: {
        ability: abilities.con.ability,
        tempAdj: abilities.con.tempAdj
      },
      intForm: {
        ability: abilities.int.ability,
        tempAdj: abilities.int.tempAdj
      },
      wisForm: {
        ability: abilities.wis.ability,
        tempAdj: abilities.wis.tempAdj
      },
      chaForm: {
        ability: abilities.cha.ability,
        tempAdj: abilities.cha.tempAdj
      }
    }, { emitEvent: false });
  }

  initSavingThrowForm(): FormGroup {
    return this.fb.group({
      forForm: this.fb.group({
        base: ['', maxNumberValidator()],
        magic: ['', maxNumberValidator()],
        misc: ['', maxNumberValidator()],
        temp: ['', maxNumberValidator()],
        other: ['', maxNumberValidator()],
      }),
      refForm: this.fb.group({
        base: ['', maxNumberValidator()],
        magic: ['', maxNumberValidator()],
        misc: ['', maxNumberValidator()],
        temp: ['', maxNumberValidator()],
        other: ['', maxNumberValidator()],
      }),
      willForm: this.fb.group({
        base: ['', maxNumberValidator()],
        magic: ['', maxNumberValidator()],
        misc: ['', maxNumberValidator()],
        temp: ['', maxNumberValidator()],
        other: ['', maxNumberValidator()],
      })
    });
  }

  setSavingThrowsForm(throws: SavingThrows) {
    this.savingThrowsForm.patchValue({
      forForm: {
        base: throws.for.base,
        magic: throws.for.magic,
        misc: throws.for.misc,
        temp: throws.for.temp,
        other: throws.for.other
      },
      refForm: {
        base: throws.ref.base,
        magic: throws.ref.magic,
        misc: throws.ref.misc,
        temp: throws.ref.temp,
        other: throws.ref.other,
      },
      willForm: {
        base: throws.will.base,
        magic: throws.will.magic,
        misc: throws.will.misc,
        temp: throws.will.temp,
        other: throws.will.other,
      }
    }, { emitEvent: false });
  }
}
