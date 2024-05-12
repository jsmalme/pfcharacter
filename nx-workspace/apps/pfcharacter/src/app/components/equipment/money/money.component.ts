/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Character } from 'libs/character-classes/character';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatLegacyFormField as MatFormField } from '@angular/material/legacy-form-field';
import { CharacterDataService } from '../../../services/character-data.service';
import { Observable, debounceTime, first } from 'rxjs';
import { Money } from 'libs/character-classes/equipment';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
})
export class MoneyComponent implements OnInit {
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  character$: Observable<Character>;

  moneyForm = this.fb.group({
    cp: [0 as number | null],
    sp: [0 as number | null],
    gp: [0 as number | null],
    pp: [0 as number | null],
  })

  constructor(
    private store: CharacterDataService,
    private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.setMoneyForm(char.equipment.money);
    });

    this.moneyForm.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if (!this.moneyForm.valid) {
        return;
      }
      this.store.updateMoney(info as Money);
    });
  }

  setMoneyForm(money: Money) {
    this.moneyForm.setValue({
      cp: money.cp,
      sp: money.sp,
      gp: money.gp,
      pp: money.pp
    }, { emitEvent: false });
  }


  fixTheOutlines() {
    setTimeout(() => this.formFields.forEach(ff => {
      ff.updateOutlineGap()
    }), 100);
  }
}
