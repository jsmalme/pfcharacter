/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterDataService } from '../../../services/character-data.service';
import { MatFormField } from '@angular/material/form-field';
import { Observable, debounceTime } from 'rxjs';
import { Character } from 'libs/character-classes/character';
import { Gear } from 'libs/character-classes/equipment';
import { GearItemComponent } from '../../gear-item/gear-item.component';

@Component({
  selector: 'app-gear',
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.scss'],
})
export class GearComponent implements OnInit {
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  character$: Observable<Character>;
  gearForm: FormGroup;

  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.gearForm = this.initGearForm();
    this.character$ = this.store.characterUpdate$;
    this.character$.subscribe((char: Character) => {
      this.setGearFormGroup(char.equipment.gear);
    }); 
  }

  get gearArray(): FormArray {
    return this.gearForm?.get('gearItems') as FormArray;
  }

  setGearFormGroup(gearItems: Gear[]): void {
    if (gearItems === undefined) {
      return;
    }

    gearItems.map(item => {
      this.gearArray.push( this.fb.group({
        name: [item.name, Validators.maxLength(50)],
        weight: [item.weight, Validators.maxLength(10)]
      }));
    });

    this.gearForm.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      if(!this.gearForm?.valid){
        return;
      }
      this.store.updateGear(info.gearItems);
    }); 
  }

  initGearForm(): FormGroup{
    return this.fb.group({
      gearItems: this.fb.array([]),
    });
  }


  deleteGearItem(index: number) {
    this.gearArray.removeAt(index);
  }

  addGearItem(): void {
    this.gearArray.push(GearItemComponent.createGearItem(), {emitEvent: false});
  }
}
