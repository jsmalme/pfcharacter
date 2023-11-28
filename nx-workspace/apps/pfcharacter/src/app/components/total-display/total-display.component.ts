/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnChanges } from '@angular/core';
import { Skill } from 'libs/character-classes/skills';

@Component({
  selector: 'app-total-display',
  templateUrl: './total-display.component.html',
  styleUrls: ['./total-display.component.scss'],
})

export class TotalDisplayComponent implements OnChanges {
  @Input() isValid: boolean | undefined;
  @Input() total: number | null;
  @Input() showGreyZeros: boolean | null;
  @Input() skill: Skill | null = null;
  showBlockIcon = false;

  ngOnChanges(): void {
    if (this.skill) {
      this.showBlockIcon = this.skill.trained_skill && this.skill.ranks < 1;
    }
  }

}
