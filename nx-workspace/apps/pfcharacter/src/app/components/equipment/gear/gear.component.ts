/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CharacterDataService } from '../../../services/character-data.service';
import { MatFormField } from '@angular/material/form-field';
import { Observable } from 'rxjs';
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

  gearForm = this.fb.group({
    gearItems: this.fb.array<Gear>([]),
  });

  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.subscribe((char: Character) => {
      this.setGearFormGroup(char.equipment.gear);
    });
  }

  get gearArray(): FormArray {
    return this.gearForm.controls.gearItems as FormArray;
  }


  setGearFormGroup(gear: Gear[]): void {
    if (gear === undefined) {
      return;
    }
    gear.map((item) => {
      this.gearArray.push(this.fb.group({
        name: [item.name, Validators.maxLength(50)],
        weight: [item.weight, Validators.maxLength(10)]
      }));
    });
  }

  deleteGearItem(index: number) {
    this.gearArray.removeAt(index);
  }

  addGearItem(): void {
    this.gearArray.push(GearItemComponent.createGearItem());
  }
}
