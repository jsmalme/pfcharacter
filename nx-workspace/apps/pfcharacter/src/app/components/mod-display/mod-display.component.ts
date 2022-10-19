/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-mod-display',
  templateUrl: './mod-display.component.html',
  styleUrls: ['./mod-display.component.scss'],
})
export class ModDisplayComponent implements OnInit{

  @Input() score: string | undefined = '';
  @Input() control!: string;
  @Input() mod: number | undefined = 0;
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(){
    this.form = this.rootFormGroup.control;
  }
  

  calculateModColor(modNum: number | undefined){
    if(modNum === undefined){
      return "808080";
    }
    if(modNum < 0){
      return "#bc1f26";
    }
    else if(modNum === 0){
      return "#FF2400";
    }
    else if(modNum === 1){
      return "#ff8c00";
    }
    else if (modNum === 2){
      return "#FFC000";
    }
    else if (modNum === 3){
      return "#99C96A";
    }
    else if (modNum === 4){
      return "#60AA17";
    }
    else if (modNum >=5){
      return "#0f9246";
    }
    else{
      return "#808080";
    }
  }
}
