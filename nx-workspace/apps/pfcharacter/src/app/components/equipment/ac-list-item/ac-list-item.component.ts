/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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
  @Input() index: number | null;
  @Output() deleteAcItemEvent = new EventEmitter();
  @Input() public acItemForm: FormGroup;

  static createAcListItem(): FormGroup {
    const fb = new FormBuilder().nonNullable;
    return fb.group({
      name: ['', Validators.maxLength(20)],
      bonus: [null as number | null, Validators.max(100)],
      type: [null as acTypeEnum | null],
      check_pen: [null as number | null, Validators.max(100)],
      spell_failure: ['', Validators.maxLength(4)],
      properties: ['', Validators.maxLength(50)],
      weight: [null as number | null, Validators.max(5000)],
      max_dex: [null as number | null, Validators.max(100)],
      equipped: [false],
    });
  }

  constructor(public dialog: MatDialog) {}

  deleteAcListItem() {
    this.dialog
      .open(DeleteItemDialogComponent, {
        data: {
          title: 'Delete AC Item',
          message: `Are you sure you want to delete this AC item ${
            this.acItemForm.get('name')?.value
          }?`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteAcItemEvent.emit(this.index);
        }
      });
  }
}
