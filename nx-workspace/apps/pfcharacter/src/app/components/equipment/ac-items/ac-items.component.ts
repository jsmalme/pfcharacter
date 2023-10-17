import { InMemoryDataService } from './../../../services/in-memory-data.service';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Character } from 'libs/character-classes/character';
import { AcItem } from 'libs/character-classes/equipment';
import { Observable, Subject, first, takeUntil } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';

enum ArmorTypeEnum {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
  Shield = 'Shield'
}

@Component({
  selector: 'app-ac-items',
  templateUrl: './ac-items.component.html',
  styleUrls: ['./ac-items.component.scss'],
})
export class AcItemsComponent implements OnInit, OnDestroy {
  character$: Observable<Character>;
  destroy$ = new Subject<void>();
  acItemsForm = this.fb.group({
    acItems: this.fb.array([])
  });

  // acItemsForm = this.fb.group({
  //   name: ['', Validators.maxLength(20)],
  //   bonus: [undefined as number | undefined, Validators.max(100)],
  //   type: [undefined as ArmorTypeEnum | undefined],
  //   checkPen: [undefined as number | undefined, Validators.max(100)],
  //   spellFailure: ['', Validators.maxLength(4)],
  //   properties: ['', Validators.maxLength(50)],
  // })


  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.setAcItemsFormGroup(char.equipment.acItems);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setAcItemsFormGroup(items: AcItem[]): void {
    if (items === undefined) {
      return;
    }
    items.map((item) => {
      this.acItems.push(this.acItemToFormControl(item));
    });

    this.acItemsForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((info) => {
      if (!this.acItemsForm.valid) {
        return;
      }
      this.store.updateAcItems(info.acItems as AcItem[]);
    });
  }

  acItemToFormControl(item: AcItem): FormGroup {
    return this.fb.group({
      name: [item.name, Validators.maxLength(20)],
      bonus: [item.bonus, Validators.max(100)],
      type: [item.type],
      checkPen: [item.checkPen, Validators.max(100)],
      spellFailure: [item.spellFailure, Validators.max(100)],
      properties: [item.properties, Validators.maxLength(50)],
    });
  }

  get acItems(): FormArray {
    return this.acItemsForm.controls.acItems as FormArray;
  }

  // createAcItem(): FormGroup {
  //   const fb = new FormBuilder().nonNullable;
  //   return fb.group({
  //     name: ['', Validators.maxLength(20)],
  //     bonus: ['', Validators.max(100)],
  //     type: [''],
  //     checkPen: ['', Validators.max(100)],
  //     spellFailure: ['', Validators.max(100)],
  //     properties: ['', Validators.maxLength(50)],
  //   })
  // }

  // addAcItem() {
  //   this.acItemsArray.push(t);
  // }

  // deleteAcItem(index: number) {
  //   this.acItemsArray.removeAt(index);
  // }
}
