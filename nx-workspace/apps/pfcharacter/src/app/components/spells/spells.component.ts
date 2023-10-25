
import { Component, OnInit } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { Character } from 'libs/character-classes/character';
import { Spell, SpellStat } from 'libs/character-classes/spells';
import { group } from 'console';

@Component({
  selector: 'nx-workspace-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit {
  character$: Observable<Character>;
  sortedSpells: Record<number, Spell[]>;
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
      this.sortSpells(char.spells.spellList);
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

  sortSpells(spells: Spell[] | undefined) {
    if (!spells) {
      return;
    }

    const groupedSpells: Record<number, Spell[]> = {};

    spells.forEach(spell => {
      const { level } = spell;
      if (groupedSpells[level]) {
        groupedSpells[level].push(spell);
      }
      else {
        groupedSpells[level] = [spell];
      }
    });

    this.sortedSpells = groupedSpells;
  }
}
