import { TotalDisplayComponent } from './../total-display/total-display.component';

import { Component, OnDestroy, OnInit, ViewChild, enableProdMode, EventEmitter } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, first, takeUntil } from 'rxjs';
import { Character } from 'libs/character-classes/character';
import { Spell, SpellStat } from 'libs/character-classes/spells';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { SpellDrawerService } from '../../services/spell-drawer.service';
import { SpellDetailsComponent } from './spell-details/spell-details.component';
import * as _ from "lodash";

@Component({
  selector: 'nx-workspace-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  character$: Observable<Character>;
  destroy$ = new Subject<void>();
  sortedSpells: Record<number, Spell[]> = {};
  drawerStatus: Record<number, boolean> = {};
  spellStatsForm = this.fb.group({
    spellStats: this.fb.array<SpellStat>([]),
  });

  constructor(
    private store: CharacterDataService,
    private spellDrawer: SpellDrawerService,
    private fb: NonNullableFormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.sortSpells(char.spells.spellList);
      this.setSpellStatsForm(char.spells.stats, char.spells.spellList);
    });
    this.drawerStatus = this.spellDrawer.drawerStatus;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setSpellStatsForm(stats: SpellStat[] | undefined, spells: Spell[] | undefined): void {
    if (stats === undefined || spells === undefined) {
      return;
    }
    stats.map((stat, index) => {
      const used = spells.filter(s => s.level === index).reduce((acc, curr) => acc + curr.usedCount, 0);
      this.spellStats.push(this.spellStatToFormControl(stat, used, this.sortedSpells[index]));
    });

    this.spellStatsForm.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(1000)).subscribe((stats) => {
      if (!this.spellStatsForm.valid) {
        return;
      }
      stats.spellStats?.forEach((stat: SpellStat | null, index: number) => {
        this.updateSpellStat(stat, index);
      });

      this.store.updateSpellStats(stats?.spellStats);
    });
  }

  get spellStats(): FormArray {
    return this.spellStatsForm.controls.spellStats as FormArray;
  }

  spellStatToFormControl(stat: SpellStat, used: number, spells: Spell[]): FormGroup {
    let known = 0;
    if (spells) {
      known = spells.length;
    }
    return this.fb.group({
      spellsPerDay: [stat.spellsPerDay, Validators.max(100)],
      spellsKnown: [{ value: known, disabled: true }],
      saveDc: [stat.saveDc, Validators.max(100)],
      bonusSpells: [stat.bonusSpells, Validators.max(100)],
      used: [used],
      totalSpellMarkers: [stat.bonusSpells + stat.spellsPerDay],
    });
  }

  getSpellAvailabilityMarkers(spellStat: AbstractControl<unknown, unknown>): number[] {
    const available = (spellStat.get('totalSpellMarkers')?.value ?? 0) - (spellStat.get('used')?.value ?? 0);

    if (available < 0) {
      return [];
    }
    return new Array(available).fill(0);
  }

  getSpellUsedMarkers(spellStat: AbstractControl<unknown, unknown>): number[] {
    return new Array(spellStat.get('used')?.value ?? 0).fill(0);
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

  useSpell(spell: Spell) {
    let spellCount = 0;
    const usedSpell = this.sortedSpells[spell.level]?.find(s => s.name === spell.name);
    if (usedSpell) {
      usedSpell.usedCount++;
      spellCount = usedSpell.usedCount;
    }

    const currentCount = this.spellStats.controls.at(spell.level)?.get('used')?.value ?? 0;
    const totalCount = currentCount + 1;
    this.spellStats.controls.at(spell.level)?.get('used')?.setValue(totalCount, { emitEvent: false });

    this.store.updateSpellCount(spell, spellCount, totalCount);
  }

  resetSpellCounts() {
    this.spellStats.controls.forEach(control => {
      control.get('used')?.setValue(0, { emitEvent: false });
    });

    for (const key in this.sortedSpells) {
      const spells = this.sortedSpells[key];
      spells.forEach(s => s.usedCount = 0);
    }

    this.store.resetSpellCounts();
  }

  setOpen(level: number) {
    this.spellDrawer.drawerStatus[level] = true;
  }

  setClosed(level: number) {
    this.spellDrawer.drawerStatus[level] = false;
  }

  addOrViewSpell(spell: Spell | null, isNew: boolean = false) {
    this.dialog.open(SpellDetailsComponent, {
      width: '80em',
      disableClose: true,
      data: { spell: spell, new: isNew }
    }).afterClosed().subscribe((result: Spell) => {
      let isUpdate = false;
      if (result) {
        if (isNew) {
          this.store.addSpell(result);
          isUpdate = true;
        }
        else {
          if (!_.isEqual(result, spell)) {
            this.store.updateSpell(result);
            isUpdate = true;
          }
          return;
        }
        if (isUpdate) {
          this.character$.pipe(first()).subscribe((char: Character) => {
            this.sortSpells(char.spells.spellList);
            this.patchSpellStatForm(char.spells.stats[result.level], this.sortedSpells[result.level], result.level);
          });
        }
      }
    });
  }

  patchSpellStatForm(stat: SpellStat, spells: Spell[], index: number = stat.spellsPerDay): void {
    this.spellStats.controls[index].patchValue({
      ...stat,
      spellsKnown: spells.length,
      totalSpellMarkers: (stat?.bonusSpells ?? 0) + (stat?.spellsPerDay ?? 0)
    }, { emitEvent: false });

  }

  updateSpellStat(stat: SpellStat | null, index: number) {
    this.spellStats.controls[index].patchValue({
      ...stat,
      totalSpellMarkers: (stat?.bonusSpells ?? 0) + (stat?.spellsPerDay ?? 0)
    }, { emitEvent: false });
  }
}
