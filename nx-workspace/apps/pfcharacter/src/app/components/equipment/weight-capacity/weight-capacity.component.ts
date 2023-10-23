/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Character } from 'libs/character-classes/character';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalcTotService } from '../../../services/calc-tot.service';
import { WeightCapacity, burdenEnum } from 'libs/character-classes/equipment';

@Component({
  selector: 'app-weight-capacity',
  templateUrl: './weight-capacity.component.html',
  styleUrls: ['./weight-capacity.component.scss'],
})
export class WeightCapacityComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  character$: Observable<Character>;
  carryingCapacityForm: FormGroup;
  burdenEnum = burdenEnum;
  currentBurden: burdenEnum = burdenEnum.light;
  destroy$ = new Subject<void>();
  totalWeight: number | undefined = 0;

  constructor(
    private store: CharacterDataService,
    private totService: CalcTotService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(takeUntil(this.destroy$)).subscribe((char: Character) => {
      this.carryingCapacityForm = this.initCarryingCapacityForm();
      this.totalWeight = this.totService.getTotalWeight(char.equipment.gear, char.combatInfo.weapons, char.equipment.acItems);
      this.setCarryingCapacityForm(char.equipment.weightCaps);
      this.currentBurden = this.totService.calculateEncumbrance(char.equipment.weightCaps, this.totalWeight);
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
}