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
  current_burden: burdenEnum = burdenEnum.light;
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
      this.totalWeight = this.totService.getTotalWeight(char.equipment.gear, char.combatInfo.weapons, char.equipment.ac_items);
      this.setCarryingCapacityForm(char.equipment.weight_caps);
      this.current_burden = this.totService.calculateEncumbrance(char.equipment.weight_caps, this.totalWeight);
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
      light_load: ['',],
      med_load: [''],
      heavy_load: [''],
      lift_over_head: [''],
      lift_off_ground: [''],
      drag_or_push: [''],
      current_burden: ['']
    })
  }

  setCarryingCapacityForm(info: WeightCapacity) {
    this.carryingCapacityForm.patchValue({
      light_load: `<= ${info.light_load} lbs`,
      med_load: `${info.med_load?.min} - ${info.med_load?.max} lbs`,
      heavy_load: `${info.heavy_load?.min} - ${info.heavy_load?.max} lbs`,
      drag_or_push: `${info.drag_or_push} lbs`,
      lift_off_ground: `${info.lift_off_ground} lbs`,
      lift_over_head: `${info.lift_over_head} lbs`,
      current_burden: this.totalWeight
    })
  }
}