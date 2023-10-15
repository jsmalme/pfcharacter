/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Character } from 'libs/character-classes/character';
import { Observable } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeightCapacity } from 'libs/character-classes/equipment';

@Component({
  selector: 'app-weight-capacity',
  templateUrl: './weight-capacity.component.html',
  styleUrls: ['./weight-capacity.component.scss'],
})
export class WeightCapacityComponent implements OnInit {
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  character$: Observable<Character>;
  carryingCapacityForm: FormGroup;

  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.subscribe((char: Character) => {
      this.carryingCapacityForm = this.initCarryingCapacityForm();
      this.setCarryingCapacityForm(char.equipment.weightCaps, char.equipment.totalWeight);
    });
  }

  fixTheOutlines() {
    setTimeout(() => this.formFields.forEach(ff => {
      ff.updateOutlineGap()
    }), 100);
  }

  initCarryingCapacityForm(): FormGroup {
    return this.fb.group({
      lightLoad: ['', {disabled: true}],
      mediumLoad: ['', {disabled: true}],
      heavyLoad: ['', {disabled: true}],
      liftOverHead: ['', {disabled: true}],
      liftOffGround: ['', {disabled: true}],
      dragPush: ['', {disabled: true}], 
      currentBurden: ['', {disabled: true}]
    })
  }

  setCarryingCapacityForm(info: WeightCapacity, totalWeight: number | undefined){
    this.carryingCapacityForm.patchValue({
      ...info,
      currentBurden: totalWeight
    })
  }
}