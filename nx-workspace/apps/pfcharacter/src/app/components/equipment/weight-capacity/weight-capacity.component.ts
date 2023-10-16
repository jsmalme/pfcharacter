/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Character } from 'libs/character-classes/character';
import { Observable } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IWeightCapacity, WeightCapacity } from 'libs/character-classes/equipment';

@Component({
  selector: 'app-weight-capacity',
  templateUrl: './weight-capacity.component.html',
  styleUrls: ['./weight-capacity.component.scss'],
})
export class WeightCapacityComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatFormField) formFields!: QueryList<MatFormField>;
  @ViewChild('lightLoad') lightLoad!: ElementRef;
  @ViewChild('medLoad') medLoad!: ElementRef;
  @ViewChild('heavyLoad') heavyLoad!: ElementRef;

  character$: Observable<Character>;
  carryingCapacityForm: FormGroup;
  weightCaps: WeightCapacity;
  totalWeight = 0;

  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.subscribe((char: Character) => {
      this.carryingCapacityForm = this.initCarryingCapacityForm();
      this.setCarryingCapacityForm(char.equipment.weightCaps, char.equipment.totalWeight);
      this.weightCaps = char.equipment.weightCaps;
      this.totalWeight = char.equipment.totalWeight || 0;
    });
  }

  ngAfterViewInit(): void{
    this.fixTheOutlines();
    this.setCurrentLoad(this.weightCaps, this.totalWeight);
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

  setCarryingCapacityForm(info: WeightCapacity, totalWeight: number | undefined){
    this.carryingCapacityForm.patchValue({
      lightLoad: `<= ${info.lightLoad} lbs`,
      medLoad: `${info.medLoad?.min} - ${info.medLoad?.max} lbs`,
      heavyLoad: `${info.heavyLoad?.min} - ${info.heavyLoad?.max} lbs`,
      dragOrPush: `${info.dragOrPush} lbs`,
      liftOffGround: `${info.liftOffGround} lbs`,
      liftOverHead: `${info.liftOverHead} lbs`,
      currentBurden: totalWeight
    })
  }

  setCurrentLoad(info: IWeightCapacity, totalWeight: number | undefined){
    if(totalWeight && info){
      if(totalWeight <= (info.lightLoad ?? 0)){
        console.log('focus light');
        this.lightLoad.nativeElement.focus();
      }
      else if(totalWeight >= (info.medLoad?.min || 0) && totalWeight <= (info.medLoad?.max || 0)){
        console.log('focus med');
        this.medLoad.nativeElement.focus();
      }
      else if(totalWeight >= (info.heavyLoad?.min || 0)){
        console.log('focus heavy');
        this.heavyLoad.nativeElement.focus();
      }
    }
  }
}