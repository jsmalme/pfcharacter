/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';
import { acTypeEnum } from 'libs/character-classes/equipment';

@Component({
  selector: 'app-ac-list-item',
  templateUrl: './ac-list-item.component.html',
  styleUrls: ['./ac-list-item.component.scss'],
})
export class AcListItemComponent {

  static fb: FormBuilder;
  acTypeEnum = acTypeEnum;
  acTypes = Object.values(this.acTypeEnum);
  @Input() index: number | undefined;
  @Output() deleteAcItemEvent = new EventEmitter();
  @Input() public acItemForm: FormGroup;

  static createAcListItem(): FormGroup {
    const fb = new FormBuilder().nonNullable;
    return fb.group({
      name: ['', Validators.maxLength(20)],
      bonus: [undefined as number | undefined, Validators.max(100)],
      type: [undefined as acTypeEnum | undefined],
      checkPen: [undefined as number | undefined, Validators.max(100)],
      spellFailure: ['', Validators.maxLength(4)],
      properties: ['', Validators.maxLength(50)],
      weight: [undefined as number | undefined, Validators.max(5000)],
      maxDex: [undefined as number | undefined, Validators.max(100)],
      equipped: [false]
    });
  }

  constructor(public dialog: MatDialog) { }

  deleteAcListItem() {
    const dialogRef = this.dialog.open(DeleteItemDialogComponent);
    const instance = dialogRef.componentInstance;
    instance.title = 'Delete AC Item';
    instance.message = `Are you sure you want to delete this AC item ${this.acItemForm.get('name')?.value}?`;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAcItemEvent.emit(this.index);
      }
    });
  }
}
