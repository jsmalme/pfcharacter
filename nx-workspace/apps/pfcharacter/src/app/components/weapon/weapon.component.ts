/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss'],
})

export class WeaponComponent implements OnInit {
  constructor() {}

  @Input() layoutType: 'weapon' | 'addWeapon' = 'addWeapon';

  ngOnInit(): void {}
}
