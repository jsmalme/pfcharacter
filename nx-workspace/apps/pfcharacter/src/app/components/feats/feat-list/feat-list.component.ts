import { debounce } from 'rxjs';
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from 'libs/character-classes/character';
import { Observable, first } from 'rxjs';
import { CharacterDataService } from '../../../services/character-data.service';
import { Feat } from 'libs/character-classes/feats-abilities';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { FeatDetailsComponent } from '../feat-details/feat-details.component';
import { DrawerExpansionService } from '../../../services/drawer-expansion.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-feat-list',
  templateUrl: './feat-list.component.html',
  styleUrls: ['./feat-list.component.scss'],
})
export class FeatListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  character$: Observable<Character>;
  drawerStatus: Record<string, boolean> = {};
  featList: Feat[] = [];
  isMobileScreen = false;

  constructor(
    private store: CharacterDataService,
    private dialog: MatDialog,
    private featDrawer: DrawerExpansionService,
  ) { }

  ngOnInit(): void {
    this.isMobileScreen = window.innerWidth < 577;
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe().subscribe((char: Character) => {
      if (this.featDrawer.featDrawerStatus) {
        this.drawerStatus = this.featDrawer.featDrawerStatus;
      }
      else {
        char.feats.forEach((feat) => {
          this.drawerStatus[feat.name] = false;
        });
        this.featDrawer.featDrawerStatus = this.drawerStatus;
      }
      this.featList = char.feats;
    });
  }

  addOrViewFeat(feat: Feat | null, isNew: boolean = false) {
    console.log('isMobileScreen', this.isMobileScreen);
    this.dialog.open(FeatDetailsComponent, {
      maxWidth: this.isMobileScreen ? '100vw' : 'auto',
      minWidth: '50vw',
      disableClose: true,
      data: { feat: feat, isNew: isNew }
    }).afterClosed().pipe(first()).subscribe((result) => {
      let isUpdate = false;
      if (result) {
        if (isNew) {
          this.store.addFeat(result);
          isUpdate = true;
        }
        else {
          if (result.delete) {
            this.store.deleteFeat(feat);
            isUpdate = true;
          }
          else if (!_.isEqual(result, feat)) {
            this.store.updateFeat(result);
            isUpdate = true;
          }
          else {
            return;
          }
        }
        if (isUpdate) {
          this.character$.pipe(first()).subscribe((char: Character) => {
            this.featList = char.feats;
          });
        }
      }
    });
  }

  drop(event: CdkDragDrop<Feat[]>) {
    moveItemInArray(this.featList, event.previousIndex, event.currentIndex);
    this.store.updateFeatList(this.featList);
  }

  setOpen(featName: string) {
    if (!this.featDrawer.featDrawerStatus) {
      return;
    }
    this.featDrawer.featDrawerStatus[featName] = true;
  }

  setClosed(featName: string) {
    if (!this.featDrawer.featDrawerStatus) {
      return;
    }
    this.featDrawer.featDrawerStatus[featName] = false;
  }

}
