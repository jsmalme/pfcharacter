import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralInfo, SizeEnum } from '../../../../../../libs/character-classes/general-info';
import { CharacterService } from '../../services/character.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss', '../../app.component.scss']
})
export class GeneralComponent implements OnInit {
  generalInfoForm!: FormGroup; 
  sizeType = SizeEnum;
  normalSizes = ['Small', 'Medium', 'Large'];
  exoticSizes = ['Tiny', 'Diminutive', 'Fine', 'Huge', 'Gargantuan', 'Colossal'];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.createFormGroup(this.characterService.character.generalInfo);
    this.generalInfoForm?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      console.log("UpdatingGeneralInfo")
      this.characterService.updateGeneralInfo(info);
    })
  }

  createFormGroup(generalInfo: GeneralInfo): void {
    this.generalInfoForm = new FormGroup({
      characterName: new FormControl(generalInfo.characterName),
      playerName: new FormControl(generalInfo.playerName),
      alignment: new FormControl(generalInfo.alignment),
      classLevel: new FormControl(generalInfo.classLevel),
      deity: new FormControl(generalInfo.deity),
      homeland: new FormControl(generalInfo.homeland),
      race: new FormControl(generalInfo.race),
      size: new FormControl(generalInfo.size),
      gender: new FormControl(generalInfo.gender),
      age: new FormControl(generalInfo.age), 
      height: new FormControl(generalInfo.height),
      weight: new FormControl(generalInfo.weight),
      hair: new FormControl(generalInfo.hair),
      eyes: new FormControl(generalInfo.eyes),
      baseSpeed: new FormControl(generalInfo.baseSpeed),
      armorSpeed: new FormControl(generalInfo.armorSpeed),
      flyManeuver: new FormControl(generalInfo.flyManeuver),
      swimSpeed: new FormControl(generalInfo.swimSpeed),
      climbSpeed: new FormControl(generalInfo.climbSpeed),
      burrowSpeed: new FormControl(generalInfo.burrowSpeed),
      speedTempMods: new FormControl(generalInfo.speedTempMods),
      languages: new FormControl(generalInfo.languages),
      notes: new FormControl(generalInfo.notes)
    });
  }
}
