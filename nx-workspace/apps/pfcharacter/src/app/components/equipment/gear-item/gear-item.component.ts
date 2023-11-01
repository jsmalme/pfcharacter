/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';

@Component({
  selector: 'app-gear-item',
  templateUrl: './gear-item.component.html',
  styleUrls: ['./gear-item.component.scss'],
})
export class GearItemComponent {

  static fb: FormBuilder;
  @Input() index: number | undefined;
  @Output() deleteGearItemEvent = new EventEmitter();
  @Input() public gearItemForm: FormGroup;

  static createGearItem(): FormGroup {
    const fb = new FormBuilder().nonNullable;
    return fb.group({
      name: ['', Validators.maxLength(50)],
      weight: [undefined as number | undefined, Validators.maxLength(10)],
    });
  }

  constructor(public dialog: MatDialog) { }

  deleteGearItem() {
    this.dialog.open(DeleteItemDialogComponent, {
      data: { title: 'Delete Gear Item', message: `Are you sure you want to delete this gear item ${this.gearItemForm.get('name')?.value}?` }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.deleteGearItemEvent.emit(this.index);
      }
    });
  }
}
