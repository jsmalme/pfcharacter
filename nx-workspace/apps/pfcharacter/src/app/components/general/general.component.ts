/* eslint-disable @angular-eslint/component-selector */
import { Character } from './../../../../../../libs/character-classes/character';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GeneralInfo, SizeEnum } from '../../../../../../libs/character-classes/general-info';
import { CharacterDataService } from '../../services/character-data.service';
import { debounceTime, Observable } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss', '../../app.component.scss']
})
export class GeneralComponent implements OnInit {
  generalInfoForm: FormGroup;
  character$: Observable<Character>;
  normalSizes = ['Small', 'Medium', 'Large'];
  exoticSizes = ['Tiny', 'Diminutive', 'Fine', 'Huge', 'Gargantuan', 'Colossal'];

  constructor(private store: CharacterDataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generalInfoForm = this.initGeneralForm();

    this.character$ = this.store.characterUpdate$;
    this.character$.subscribe((char: Character) => {
      this.setFormGroup(char.general_info);
    });

    this.generalInfoForm.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      this.store.updateGeneralInfo(info);
    });
  }

  setFormGroup(info: GeneralInfo) {
    this.generalInfoForm.patchValue(info, { emitEvent: false });
  }

  initGeneralForm(): FormGroup {
    return this.fb.group({
      character_name: ['', Validators.maxLength(50)],
      player_name: ['', Validators.maxLength(50)],
      alignment: ['', Validators.maxLength(50)],
      class_level: ['', Validators.maxLength(50)],
      deity: ['', Validators.maxLength(50)],
      homeland: ['', Validators.maxLength(50)],
      race: ['', Validators.maxLength(50)],
      size: ['', Validators.maxLength(50)],
      gender: ['', Validators.maxLength(50)],
      age: ['', Validators.maxLength(50)],
      height: ['', Validators.maxLength(50)],
      weight: ['', Validators.maxLength(50)],
      hair: ['', Validators.maxLength(50)],
      eyes: ['', Validators.maxLength(50)],
      base_speed: ['', Validators.maxLength(50)],
      armor_speed: ['', Validators.maxLength(50)],
      fly_maneuver: ['', Validators.maxLength(50)],
      swim_speed: ['', Validators.maxLength(50)],
      climb_speed: ['', Validators.maxLength(50)],
      burrow_speed: ['', Validators.maxLength(50)],
      speed_temp_mods: ['', Validators.maxLength(50)],
      languages: ['', Validators.maxLength(50)],
      notes: ['', Validators.maxLength(500)],
    });
  }
}
