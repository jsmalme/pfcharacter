/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Feat, FeatTypeEnum } from 'libs/character-classes/feats-abilities';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';

@Component({
  selector: 'app-feat-details',
  templateUrl: './feat-details.component.html',
  styleUrls: ['./feat-details.component.scss'],
})
export class FeatDetailsComponent implements OnInit {
  featTypes = Object.values(FeatTypeEnum);
  featForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    benefit: ['', [Validators.required, Validators.maxLength(2000)]],
    type: [FeatTypeEnum.general],
    prerequisites: ['', Validators.maxLength(100)],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FeatDetailsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { feat: Feat, isNew: boolean }
  ) { }

  ngOnInit(): void {
    if (!this.data.isNew) {
      this.featForm.patchValue(this.data.feat);
    }
  }

  save() {
    if (!this.featForm.valid) {
      return;
    }
    this.dialogRef.close(this.featForm.value);
  }

  delete() {
    this.dialog.open(DeleteItemDialogComponent, {
      data: { title: 'Delete Feat', message: `Are you sure you want remove ${this.featForm.controls.name.value} from your feat list?` }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ delete: true });
      }
    });
  }
}
