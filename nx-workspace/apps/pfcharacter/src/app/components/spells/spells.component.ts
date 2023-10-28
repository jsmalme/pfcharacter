
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, first, takeUntil } from 'rxjs';
import { Character } from 'libs/character-classes/character';
import { Spell, SpellStat } from 'libs/character-classes/spells';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { SpellDrawerService } from '../../services/spell-drawer.service';

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
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.setSpellStatsForm(char.spells.stats, char.spells.spellList);
      this.sortSpells(char.spells.spellList);
      this.drawerStatus = this.spellDrawer.drawerStatus;
    });

    console.log(this.spellStatsForm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setSpellStatsForm(stats: SpellStat[] | undefined, spells: Spell[] | undefined): void {
    if (stats === undefined || spells === undefined) {
      return;
    }
    stats.map((stat) => {
      this.spellStats.push(this.spellStatToFormControl(stat));
    });

    this.spellStatsForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(stats => {

    });
  }

  get spellStats(): FormArray {
    return this.spellStatsForm.controls.spellStats as FormArray;
  }

  spellStatToFormControl(stat: SpellStat): FormGroup {
    return this.fb.group({
      spellsPerDay: [stat.spellsPerDay, Validators.max(100)],
      spellsKnown: [stat.spellsKnown, Validators.max(100)],
      saveDc: [stat.saveDc, Validators.max(100)],
      bonusSpells: [stat.bonusSpells, Validators.max(100)],
      used: [stat.used]
    });
  }

  getSpellAvailabilityMarkers(spellStat: AbstractControl<unknown, unknown>): number[] {
    const total = ((spellStat.get('bonusSpells')?.value ?? 0) + (spellStat.get('spellsPerDay')?.value ?? 0))
      - (spellStat.get('used')?.value ?? 0)


    console.log('total', total);

    if (total < 0) {
      return [];
    }

    return new Array(total).fill(0);
  }

  getSpellStatTotalSpells(spellStat: AbstractControl<unknown, unknown>): number {
    return (spellStat.get('bonusSpells')?.value ?? 0) + (spellStat.get('spellsPerDay')?.value ?? 0);
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
}
