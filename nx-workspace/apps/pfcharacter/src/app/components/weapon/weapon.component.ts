/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWeponDialogComponent } from '../delete-wepon-dialog/delete-wepon-dialog.component';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss'],
})

export class WeaponComponent {

  static fb: FormBuilder;
  @Input() index: number | undefined;
  @Output() deleteWeaponEvent = new EventEmitter();
  @Input() public weaponForm!: FormGroup;

  constructor(public dialog: MatDialog){}

  static createWeapon(): FormGroup{
    const fb = new FormBuilder().nonNullable;
    return fb.group({
      name: [undefined],
      weight: [undefined],
      ammunition: [undefined],
      attackBonus: [undefined],
      critical: [undefined],
      type: [undefined],
      damage: [undefined],
      range: [undefined]
    })
  }

  deleteWeapon(){
    const dialogRef = this.dialog.open(DeleteWeponDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.deleteWeaponEvent.emit(this.index);
      }
    });
  }  
}
