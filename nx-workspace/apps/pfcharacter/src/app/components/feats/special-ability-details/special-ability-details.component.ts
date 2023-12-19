import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feat, SpecialAbility } from 'libs/character-classes/feats-abilities';
import { FeatDetailsComponent } from '../feat-details/feat-details.component';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';

@Component({
  selector: 'nx-workspace-special-ability-details',
  templateUrl: './special-ability-details.component.html',
  styleUrls: ['./special-ability-details.component.scss'],
})
export class SpecialAbilityDetailsComponent implements OnInit {
  specialAbilityForm = this.fb.group({
    name: ['', Validators.required],
    benefit: [''],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FeatDetailsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { specialAbility: SpecialAbility, isNew: boolean, abilitiesList: SpecialAbility[] }
  ) { }

  ngOnInit(): void {
    if (!this.data.isNew) {
      this.specialAbilityForm.controls.name.disable();
      this.specialAbilityForm.patchValue(this.data.specialAbility);
    }
  }

  save() {
    if (!this.specialAbilityForm.valid) {
      return;
    }
    if (this.data.isNew && this.data.abilitiesList.some(a => a.name.toLowerCase() === this.specialAbilityForm.controls.name.value?.toLowerCase())) {
      this.specialAbilityForm.controls.name.setErrors({ nameExists: true });
      return;
    }

    this.dialogRef.close(this.specialAbilityForm.getRawValue());
  }

  delete() {
    this.dialog.open(DeleteItemDialogComponent, {
      data: { title: 'Delete Special Ability', message: `Are you sure you want remove ${this.specialAbilityForm.controls.name.value} from your special ability list?` }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ delete: true });
      }
    });
  }
}
