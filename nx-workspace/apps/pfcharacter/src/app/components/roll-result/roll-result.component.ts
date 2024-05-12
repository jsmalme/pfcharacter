import { DragDropModule } from '@angular/cdk/drag-drop';

import { AbilitySelection } from './../roll/roll.component';
/* eslint-disable @angular-eslint/component-selector */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-roll-result',
  templateUrl: './roll-result.component.html',
  styleUrls: ['./roll-result.component.scss'],
})

export class RollResultComponent implements OnInit {
  hasMod = false;
  hasMulitpleOrMod = false;
  totalMod = 0;
  total = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { rolls: number[], modifier: AbilitySelection, customMod: number, diceType: string }
  ) { }

  ngOnInit(): void {
    this.totalMod = (this.data.modifier?.mod ?? 0) + (this.data.customMod);
    this.total = this.data.rolls.reduce((a, b) => a + b, 0) + this.totalMod;
    this.hasMod = this.data.modifier.name !== 'None' || this.totalMod !== 0;
    this.hasMulitpleOrMod = this.data.modifier.name !== 'None' || this.totalMod !== 0 || this.data.rolls.length > 1;
  }
}
