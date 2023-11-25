/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-total-display',
  templateUrl: './total-display.component.html',
  styleUrls: ['./total-display.component.scss'],
})

export class TotalDisplayComponent {
  @Input() isValid: boolean | undefined;
  @Input() total: number | null;
  @Input() showGreyZeros: boolean | null;
}
