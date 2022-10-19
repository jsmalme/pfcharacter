/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-total-display',
  templateUrl: './total-display.component.html',
  styleUrls: ['./total-display.component.scss'],
})

export class TotalDisplayComponent implements OnInit {

  @Input() fgName!: string;
  @Input() total: number | undefined;
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }
}
