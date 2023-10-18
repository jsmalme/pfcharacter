/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Character } from 'libs/character-classes/character';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AcItem, Gear, IWeightCapacity, WeightCapacity } from 'libs/character-classes/equipment';
import { Weapon } from 'libs/character-classes/weapon';

@Component({
  selector: 'app-weight-capacity',
  templateUrl: './weight-capacity.component.html',
  styleUrls: ['./weight-capacity.component.scss'],
})
export class WeightCapacityComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  currentLoad: 'light' | 'medium' | 'heavy';
  character$: Observable<Character>;
  carryingCapacityForm: FormGroup;
  destroy$ = new Subject<void>();
  totalWeight: number | undefined = 0;

  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(takeUntil(this.destroy$)).subscribe((char: Character) => {
      this.carryingCapacityForm = this.initCarryingCapacityForm();
      this.totalWeight = this.getTotalWeight(char.equipment.gear, char.combatInfo.weapons, char.equipment.acItems);
      this.setCarryingCapacityForm(char.equipment.weightCaps);
      this.setLoadIndicator(char.equipment.weightCaps);
    });
  }

  ngAfterViewInit(): void {
    this.fixTheOutlines();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fixTheOutlines() {
    setTimeout(() => this.formFields.forEach(ff => {
      ff.updateOutlineGap()
    }), 500);
  }

  initCarryingCapacityForm(): FormGroup {
    return this.fb.group({
      lightLoad: ['',],
      medLoad: [''],
      heavyLoad: [''],
      liftOverHead: [''],
      liftOffGround: [''],
      dragOrPush: [''],
      currentBurden: ['']
    })
  }

  setCarryingCapacityForm(info: WeightCapacity) {
    this.carryingCapacityForm.patchValue({
      lightLoad: `<= ${info.lightLoad} lbs`,
      medLoad: `${info.medLoad?.min} - ${info.medLoad?.max} lbs`,
      heavyLoad: `${info.heavyLoad?.min} - ${info.heavyLoad?.max} lbs`,
      dragOrPush: `${info.dragOrPush} lbs`,
      liftOffGround: `${info.liftOffGround} lbs`,
      liftOverHead: `${info.liftOverHead} lbs`,
      currentBurden: this.totalWeight
    })
  }

  setLoadIndicator(info: IWeightCapacity) {
    if (this.totalWeight && info) {
      if (this.totalWeight <= (info.lightLoad ?? 0)) {
        this.currentLoad = 'light';
      }
      else if (this.totalWeight >= (info.medLoad?.min || 0) && this.totalWeight <= (info.medLoad?.max || 0)) {
        this.currentLoad = 'medium';
      }
      else if (this.totalWeight >= (info.heavyLoad?.min || 0)) {
        this.currentLoad = 'heavy';
      }
    }
  }

  getTotalWeight(gear: Gear[], weapons: Weapon[], acItems: AcItem[]): number {
    let totalWeight = 0;
    gear.forEach(g => totalWeight += g.weight ?? 0);
    weapons.forEach(w => totalWeight += w.weight ?? 0);
    acItems.forEach(a => totalWeight += a.weight ?? 0);
    return totalWeight;
  }
}