/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialogComponent } from '../delete-wepon-dialog/delete-wepon-dialog.component';

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

  constructor(public dialog: MatDialog) { }

  static createWeapon(): FormGroup {
    const fb = new FormBuilder().nonNullable;
    return fb.group({
      name: fb.control('', Validators.maxLength(50)),
      attackBonus: fb.control('', Validators.maxLength(10)),
      critical: fb.control('', Validators.maxLength(10)),
      type: fb.control('', Validators.maxLength(10)),
      weight: fb.control('', Validators.maxLength(10)),
      range: fb.control('', Validators.maxLength(10)),
      ammunition: fb.control('', Validators.maxLength(10)),
      damage: fb.control('', Validators.maxLength(10))
    })
  }

  deleteWeapon() {
    const dialogRef = this.dialog.open(DeleteItemDialogComponent);
    const instance = dialogRef.componentInstance;
    instance.title = 'Delete Weapon';
    instance.message = 'Are you sure you want to delete this weapon?';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWeaponEvent.emit(this.index);
      }
    });
  }
}
