
import { Component, OnInit } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { Character } from 'libs/character-classes/character';
import { Spell, SpellStat } from 'libs/character-classes/spells';

@Component({
  selector: 'nx-workspace-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit {
  character$: Observable<Character>;
  spellStatsForm = this.fb.group({
    spellStats: this.fb.array<SpellStat>([]),
  });

  constructor(
    private store: CharacterDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.setSpellStatsForm(char.spells.stats);
    });

    console.log(this.spellStatsForm.value);
  }

  setSpellStatsForm(stats: SpellStat[] | undefined): void {
    if (stats === undefined) {
      return;
    }
    stats.map((stat) => {
      this.spellStats.push(this.spellStatToFormControl(stat));
    });
  }

  get spellStats(): FormArray {
    return this.spellStatsForm.get('spellStats') as FormArray;
  }

  spellStatToFormControl(stat: SpellStat): FormGroup {
    return this.fb.group({
      spellsPerDay: [stat.spellsPerDay, Validators.max(100)],
      spellsKnown: [stat.spellsKnown, Validators.max(100)],
      saveDc: [stat.saveDc, Validators.max(100)],
      bonusSpells: [stat.bonusSpells, Validators.max(100)],
    });
  }
}
