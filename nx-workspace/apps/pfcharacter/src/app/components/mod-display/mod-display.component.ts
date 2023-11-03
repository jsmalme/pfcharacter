/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { CalcTotService } from '../../services/calc-tot.service';

@Component({
  selector: 'app-mod-display',
  templateUrl: './mod-display.component.html',
  styleUrls: ['./mod-display.component.scss'],
})
export class ModDisplayComponent implements OnInit {

  @Input() score: string | undefined = '';
  @Input() control!: string;
  @Input() mod: number | undefined = 0;
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective,
    public calcService: CalcTotService) { }

  ngOnInit() {
    this.form = this.rootFormGroup.control;
  }
}
