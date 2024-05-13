/* eslint-disable @nx/enforce-module-boundaries */
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { Spell } from 'libs/character-classes/spells';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';
import { Observable } from 'rxjs';
import { CharacterService } from '../../../services/character-http.service';

@Component({
  selector: 'nx-workspace-spell-details',
  templateUrl: './spell-details.component.html',
  styleUrls: ['./spell-details.component.scss'],
})
export class SpellDetailsComponent implements OnInit {
  filteredOptions = new Observable<SpellAutoComplete[]>();
  levelHint: string | null = null;
  spellForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    level: [null as number | null, [Validators.required, Validators.max(9)]],
    cast_time: [''],
    components: [''],
    range: [''],
    area: [''],
    duration: [''],
    description: ['', Validators.maxLength(5000)],
    short_description: ['', [Validators.required, Validators.maxLength(255)]],
    link: [''],
    school: [''],
    saving_throw: [''],
    spell_resistance: [''],
    usedCount: [0],
  });

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    public dialogRef: MatDialogRef<SpellDetailsComponent>,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA)
    public data: { spell: Spell; new: boolean; spells: Spell[] }
  ) {}

  ngOnInit(): void {
    if (!this.data.new) {
      this.spellForm.controls.name.disable();
      this.spellForm.patchValue(this.data.spell);
    }

    if (this.data.new) {
      this.spellForm.controls.name.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          if (value && value.length > 0) {
            this.filteredOptions = this.characterService.filterSpells(value);
          } else {
            this.filteredOptions = new Observable<SpellAutoComplete[]>();
          }
        });
    }
  }

  save() {
    if (!this.spellForm.valid) {
      return;
    }
    if (
      this.data.new &&
      this.data.spells.some(
        (s) =>
          s.name.toLowerCase() ===
          this.spellForm.controls.name.value?.toLowerCase()
      )
    ) {
      this.spellForm.controls.name.setErrors({ nameExists: true });
      return;
    }

    this.dialogRef.close(this.spellForm.getRawValue());
  }

  delete() {
    this.dialog
      .open(DeleteItemDialogComponent, {
        data: {
          title: 'Delete Spell',
          message: `Are you sure you want remove ${this.spellForm.controls.name.value} from your spell list?`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.dialogRef.close({
            delete: true,
            level: this.spellForm.controls.level.value,
          });
        }
      });
  }

  spellSelected(spell: SpellAutoComplete) {
    this.levelHint = spell.level;
    this.spellForm.patchValue({
      cast_time: spell.cast_time,
      components: spell.components,
      range: spell.range,
      duration: spell.duration,
      description: spell.description,
      short_description: spell.short_description,
      link: spell.link,
      school: spell.school,
      saving_throw: spell.saving_throw,
      spell_resistance: spell.spell_resistance,
    });
  }
}

class SpellAutoComplete {
  name: string;
  level: string;
  cast_time: string | null;
  components: string | null;
  range: string | null;
  area: string | null;
  duration: string | null;
  description: string | null;
  short_description: string;
  link: string | null;
  school: string | null;
  saving_throw: string | null;
  spell_resistance: string | null;
}
