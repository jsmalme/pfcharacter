/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Character } from 'libs/character-classes/character';
import { SpecialAbility } from 'libs/character-classes/feats-abilities';
import { Observable, first } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DrawerExpansionService } from '../../../services/drawer-expansion.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
import { SpecialAbilityDetailsComponent } from '../special-ability-details/special-ability-details.component';

@Component({
  selector: 'app-special-abilities',
  templateUrl: './special-abilities.component.html',
  styleUrls: ['./special-abilities.component.scss'],
})
export class SpecialAbilitiesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  character$: Observable<Character>;
  drawerStatus: Record<string, boolean> = {};
  abilitiesList: SpecialAbility[] = [];
  isMobileScreen = false;
  isMediumScreen = false;

  constructor(
    private store: CharacterDataService,
    private dialog: MatDialog,
    private drawerService: DrawerExpansionService,
  ) { }

  ngOnInit(): void {
    this.isMobileScreen = window.innerWidth < 577;
    this.isMediumScreen = window.innerWidth < 769 && window.innerWidth > 576;
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      if (this.drawerService.specialAbilityDrawerStatus) {
        this.drawerStatus = this.drawerService.specialAbilityDrawerStatus;
      }
      else {
        char.specialAbilities.forEach((ability) => {
          this.drawerStatus[ability.name] = false;
        });
        this.drawerService.specialAbilityDrawerStatus = this.drawerStatus;
      }
      this.abilitiesList = char.specialAbilities;
    });
  }

  addOrViewAbility(ability: SpecialAbility | null, isNew: boolean = false) {
    this.dialog.open(SpecialAbilityDetailsComponent, {
      maxWidth: this.isMobileScreen ? '100vw' : 'auto',
      width: this.isMobileScreen ? '100vw' : 'auto',
      minWidth: this.isMediumScreen ? '80vw' : this.isMobileScreen ? '100vw' : '60vw',
      disableClose: true,
      autoFocus: false,
      data: { specialAbility: ability, isNew: isNew }
    }).afterClosed().pipe(first()).subscribe((result) => {
      let isUpdate = false;
      if (result) {
        if (isNew) {
          this.store.addSpecialAbility(result);
          isUpdate = true;
        }
        else {
          if (result.delete) {
            this.store.deleteSpecialAbility(ability);
            isUpdate = true;
          }
          else if (!_.isEqual(result, ability)) {
            this.store.updateSpecialAbility(result);
            isUpdate = true;
          }
          else {
            return;
          }
        }
        if (isUpdate) {
          this.character$.pipe(first()).subscribe((char: Character) => {
            this.abilitiesList = char.specialAbilities;
          });
        }
      }
    });
  }


  drop(event: CdkDragDrop<SpecialAbility[]>) {
    moveItemInArray(this.abilitiesList, event.previousIndex, event.currentIndex);
    //this.store.updateSpecialAbilitiesList(this.abilitiesList);
  }

  setOpen(abilityName: string) {
    if (!this.drawerService.specialAbilityDrawerStatus) {
      return;
    }
    this.drawerService.specialAbilityDrawerStatus[abilityName] = true;
  }

  setClosed(abilityName: string) {
    if (!this.drawerService.specialAbilityDrawerStatus) {
      return;
    }
    this.drawerService.specialAbilityDrawerStatus[abilityName] = false;
  }
}
