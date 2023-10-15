/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Character } from 'libs/character-classes/character';
import { AcItem } from 'libs/character-classes/equipment';
import { Observable } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';

@Component({
  selector: 'app-ac-items',
  templateUrl: './ac-items.component.html',
  styleUrls: ['./ac-items.component.scss'],
})
export class AcItemsComponent implements OnInit {
  character$: Observable<Character>;
  acItemsForm: FormGroup;

  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.subscribe((char: Character) => {
      this.acItemsForm = this.fb.group({
        skills: this.getAcItemsFormArray(char.equipment.acItems)
      });
    });
  }

  getAcItemsFormArray(acItems: AcItem[]){
    return this.fb.array(
      acItems.map(item => this.fb.group({
        name: [item.name, Validators.maxLength(20)],
        bonus: [item.bonus, Validators.max(100)],
        type: [item.type],
        checkPen: [item.checkPen, Validators.max(100)],
        spellFailure: [item.spellFailure, Validators.max(100)],
        properties: [item.properties, Validators.maxLength(50)],
      }))
    );
  }

  get acItemsArray(): FormArray {
    return this.acItemsForm?.get('weapons') as FormArray;
  }
  get acItemsArrayControls() {
    return (this.acItemsArray?.get('weapons') as FormArray).controls;
  }

  createAcItem(): FormGroup{
    const fb = new FormBuilder().nonNullable;
    return fb.group({
      name: ['', Validators.maxLength(20)],
      bonus: ['', Validators.max(100)],
      type: [''],
      checkPen: ['', Validators.max(100)],
      spellFailure: ['', Validators.max(100)],
      properties: ['', Validators.maxLength(50)],
    })
  }

  addAcItem(){
    this.acItemsArray.push(this.createAcItem());
  }

  deleteAcItem(index: number){
    this.acItemsArray.removeAt(index);
  }
}
