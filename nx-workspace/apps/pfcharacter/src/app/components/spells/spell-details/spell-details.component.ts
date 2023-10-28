import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Spell } from 'libs/character-classes/spells';


@Component({
  selector: 'nx-workspace-spell-details',
  templateUrl: './spell-details.component.html',
  styleUrls: ['./spell-details.component.scss'],
})
export class SpellDetailsComponent implements OnInit {
  spellForm = this.fb.group({
    name: ['', Validators.required],
    level: [null as number | null, Validators.required],
    castTime: [''],
    components: [''],
    range: [''],
    area: [''],
    duration: [''],
    description: [''],
    shortDescription: ['', Validators.required],
    link: [''],
    school: [''],
    savingThrow: [''],
    spellResistance: ['']
  });

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { spell: Spell, new: boolean }) { }

  ngOnInit(): void {
    this.spellForm.patchValue(this.data.spell);
  }
}
