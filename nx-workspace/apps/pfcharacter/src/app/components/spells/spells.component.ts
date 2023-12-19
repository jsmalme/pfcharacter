/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { AbstractControl, FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, first, skip, takeUntil } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { DrawerExpansionService } from '../../services/drawer-expansion.service';
import { SpellDetailsComponent } from './spell-details/spell-details.component';
import * as _ from "lodash";
import { Character } from 'libs/character-classes/character';
import { Spell, SpellStat } from 'libs/character-classes/spells';

@Component({
  selector: 'nx-workspace-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  character$: Observable<Character>;
  destroy$ = new Subject<void>();
  spells: Spell[] = [];
  sortedSpells: Record<number, Spell[]> = {};
  drawerStatus: Record<number, boolean> = {};
  spell_statsForm = this.fb.group({
    spell_stats: this.fb.array<SpellStat>([]),
  });
  isMobileScreen = false;

  constructor(
    private store: CharacterDataService,
    private spellDrawer: DrawerExpansionService,
    private fb: NonNullableFormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isMobileScreen = window.innerWidth < 577;
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.spells = char.spells.spell_list;
      this.sortSpells(char.spells.spell_list);
      this.setSpellStatsForm(char.spells.spell_stats, char.spells.spell_list);
    });
    this.drawerStatus = this.spellDrawer.spellDrawerStatus;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setSpellStatsForm(stats: SpellStat[] | null, spells: Spell[] | null): void {
    if (stats === null || spells === null) {
      return;
    }
    stats.map((stat, index) => {
      const used = spells.filter(s => s.level === index).reduce((acc, curr) => acc + curr.usedCount, 0);
      this.spell_stats.push(this.spellStatToFormControl(stat, used, this.sortedSpells[index]));
    });

    this.spell_statsForm.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(1000)).subscribe((stats) => {
      if (!this.spell_statsForm.valid) {
        return;
      }
      stats.spell_stats?.forEach((stat: SpellStat | null, index: number) => {
        this.updateSpellStat(stat, index);
      });

      this.store.updateSpellStats(stats.spell_stats);
    });
  }

  get spell_stats(): FormArray {
    return this.spell_statsForm.controls.spell_stats as FormArray;
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

  sortSpells(spells: Spell[] | null) {
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

    for (let i = 0; i < 10; i++) {
      if (groupedSpells[i]) {
        groupedSpells[i].sort((a, b) => a.name.localeCompare(b.name));
      }
    }
    this.sortedSpells = groupedSpells;
  }

  useSpell(spell: Spell) {
    let spellCount = 0;
    const usedSpell = this.sortedSpells[spell.level]?.find(s => s.name === spell.name);
    if (usedSpell) {
      usedSpell.usedCount++;
      spellCount = usedSpell.usedCount;
    }

    const currentCount = this.spell_stats.controls.at(spell.level)?.get('used')?.value ?? 0;
    const totalCount = currentCount + 1;
    this.spell_stats.controls.at(spell.level)?.get('used')?.setValue(totalCount, { emitEvent: false });

    this.store.updateSpellCount(spell, spellCount, totalCount);
  }

  resetSpellCounts() {
    this.spell_stats.controls.forEach(control => {
      control.get('used')?.setValue(0, { emitEvent: false });
    });

    for (const key in this.sortedSpells) {
      const spells = this.sortedSpells[key];
      spells.forEach(s => s.usedCount = 0);
    }

    this.store.resetSpellCounts();
  }

  setOpen(level: number) {
    this.spellDrawer.spellDrawerStatus[level] = true;
  }

  setClosed(level: number) {
    this.spellDrawer.spellDrawerStatus[level] = false;
  }

  addOrViewSpell(spell: Spell | null, isNew: boolean = false) {
    this.dialog.open(SpellDetailsComponent, {
      maxWidth: this.isMobileScreen ? '100vw' : 'auto',
      disableClose: true,
      autoFocus: false,
      data: { spell: spell, new: isNew, spells: this.spells }
    }).afterClosed().pipe(first()).subscribe((result) => {
      let isUpdate = false;
      if (result) {
        if (isNew) {
          this.store.addSpell(result);
          isUpdate = true;
        }
        else {
          if (result.delete) {
            this.store.deleteSpell(spell);
            isUpdate = true;
          }
          else if (!_.isEqual(result, spell)) {
            this.store.updateSpell(result);
            isUpdate = true;
          }
          else {
            return;
          }
        }
        if (isUpdate) {
          this.character$.pipe(skip(1), first()).subscribe((char: Character) => {
            this.spells = char.spells.spell_list;
            this.sortSpells(char.spells.spell_list);
            this.patchSpellStatForm(char.spells.spell_stats[result.level], this.sortedSpells[result.level], result.level);
          });
        }
      }
    });
  }

  patchSpellStatForm(stat: SpellStat, spells: Spell[], index: number = stat.spellsPerDay): void {
    this.spell_stats.controls[index].patchValue({
      ...stat,
      used: spells?.reduce((acc, curr) => acc + curr.usedCount, 0) ?? 0,
      spellsKnown: spells?.length ?? 0,
      totalSpellMarkers: (stat?.bonusSpells ?? 0) + (stat?.spellsPerDay ?? 0)
    }, { emitEvent: false });

  }

  updateSpellStat(stat: SpellStat | null, index: number) {
    this.spell_stats.controls[index].patchValue({
      ...stat,
      totalSpellMarkers: (stat?.bonusSpells ?? 0) + (stat?.spellsPerDay ?? 0)
    }, { emitEvent: false });
  }
}