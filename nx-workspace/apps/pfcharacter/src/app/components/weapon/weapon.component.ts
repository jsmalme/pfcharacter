/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss'],
})

export class WeaponComponent implements OnInit{

  static fb: FormBuilder;
  @Input() index: number | undefined;
  @Output() deleteItemEvent = new EventEmitter();
  @Input() public weaponForm!: FormGroup;

  constructor(){}

  static createWeapon(): FormGroup{
    const fb = new FormBuilder().nonNullable;
    return fb.group({
      attackBonus: [undefined],
      critical: [undefined],
      type: [undefined],
      range: [undefined],
      ammo: [undefined],
      damage: [undefined]
    })
  }

  deleteWeapon(){
    this.deleteItemEvent.emit(this.index);
  }

  ngOnInit(): void {
      console.log(this.weaponForm);
  }
}
