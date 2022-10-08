import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralInfo } from '../../../../../../libs/character-classes/general-info';
import { CharacterService } from '../../services/character.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss', '../../app.component.scss']
})
export class GeneralComponent implements OnInit {
  generalInfoForm!: FormGroup; 

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.createFormGroup(this.characterService.getGeneralInfo());
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
      notes: new FormControl(generalInfo.notes)
    });
  }
}
