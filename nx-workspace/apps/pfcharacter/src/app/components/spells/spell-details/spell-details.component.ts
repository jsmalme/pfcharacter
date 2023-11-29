/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Spell } from 'libs/character-classes/spells';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';


@Component({
  selector: 'nx-workspace-spell-details',
  templateUrl: './spell-details.component.html',
  styleUrls: ['./spell-details.component.scss'],
})
export class SpellDetailsComponent implements OnInit {
  spellForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    level: [null as number | null, [Validators.required, Validators.max(9)]],
    castTime: [''],
    components: [''],
    range: [''],
    area: [''],
    duration: [''],
    description: ['', Validators.maxLength(5000)],
    shortDescription: ['', [Validators.required, Validators.maxLength(255)]],
    link: [''],
    school: [''],
    savingThrow: [''],
    spellResistance: [''],
    usedCount: [0],
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<SpellDetailsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { spell: Spell, new: boolean }) { }

  ngOnInit(): void {
    if (!this.data.new) {
      this.spellForm.patchValue(this.data.spell);
    }
  }

  save() {
    if (!this.spellForm.valid) {
      return;
    }
    this.dialogRef.close(this.spellForm.value);
  }

  delete() {
    this.dialog.open(DeleteItemDialogComponent, {
      data: { title: 'Delete Spell', message: `Are you sure you want remove ${this.spellForm.controls.name.value} from your spell list?` }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ delete: true, level: this.spellForm.controls.level.value });
      }
    });
  }

}
