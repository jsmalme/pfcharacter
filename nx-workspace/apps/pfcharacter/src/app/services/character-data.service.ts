/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Abilities, Ability } from '../../../../../libs/character-classes/abilities';
import { Character } from '../../../../../libs/character-classes/character';
import { GeneralInfo, SizeEnum } from '../../../../../libs/character-classes/general-info';
import { CombatInfo } from '../../../../../libs/character-classes/combat-info';
import { Throw } from '../../../../../libs/character-classes/saving-throws';
import { Skill } from '../../../../../libs/character-classes/skills';
import { CalcTotService } from './calc-tot.service';
import { BehaviorSubject, catchError, concatMap, of, tap, take } from 'rxjs';
import { CharacterService } from './character-http.service';
import { SnackbarService } from './snackbar.service';
import { Weapon } from 'libs/character-classes/weapon';
import * as _ from "lodash";
import { AcItem, Equipment, Gear, Money, burdenEnum } from 'libs/character-classes/equipment';
import { Spell, SpellStat } from 'libs/character-classes/spells';
import { Feat, SpecialAbility } from 'libs/character-classes/feats-abilities';
import { BADHINTS } from 'dns';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class CharacterDataService {

  constructor(
    private totService: CalcTotService,
    private http: CharacterService,
    private snackBar: SnackbarService) { }

  private isCharacterLoaded = new BehaviorSubject<boolean>(false);
  private character = new BehaviorSubject<Character>(new Character());
  characterUpdate$ = this.character.asObservable();
  isCharacterLoaded$ = this.isCharacterLoaded.asObservable();
  private tempChar: Character;
  private rollback: Character;

  get combat_info() {
    return this.character.value.combat_info;
  }
  get abilities() {
    return this.character.value.abilities;
  }

  get generalInfo() {
    return this.character.value.general_info;
  }

  get skills() {
    return this.character.value.skills;
  }

  tempRollback() {
    this.tempChar = _.cloneDeep(this.character.value);
    this.rollback = _.cloneDeep(this.character.value);
  }

  loadCharacter(characterId: number) {
    this.http.getCharacter(characterId).subscribe((data) => {
      this.character.next(data);
    })
    this.isCharacterLoaded.next(true);
  }

  resetCharacter() {
    this.character.next(new Character());
    this.isCharacterLoaded.next(false);
  }

  //ability/saving updaters--------------------------------------
  updateStr(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.str.update(info);
    this.tempChar.equipment.weight_caps.updateCarryCapacities(info, this.tempChar.general_info.size ?? SizeEnum.medium);
    this.updateSkillAbilities(this.tempChar.abilities, this.skills, 'Str', ['Climb', 'Swim']);

    const patchData = {
      abilities: this.tempChar.abilities,
      equipment: this.tempChar.equipment,
      skills: this.tempChar.skills
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateDex(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.dex.update(info);
    this.tempChar.saving_throws.ref.updateMod(this.tempChar.abilities.dex.useMod);
    const dexSkills = ['Acrobatics', 'Disable Device', 'Escape Artist', 'Fly', 'Ride', 'Sleight of Hand', 'Stealth'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skills, 'Dex', dexSkills);

    const patchData = {
      abilities: this.tempChar.abilities,
      saving_throws: this.tempChar.saving_throws,
      skills: this.tempChar.skills
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateCon(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.con.update(info);
    this.tempChar.saving_throws.fort.updateMod(this.tempChar.abilities.con.useMod);

    const patchData = {
      abilities: this.tempChar.abilities,
      saving_throws: this.tempChar.saving_throws
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateInt(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.int.update(info);
    const intSkills = ['Appraise', 'Craft1', 'Craft2', 'Craft3', 'Knowledge (Arcana)', 'Knowledge (Dungeoneering)', 'Knowledge (Engineering)',
      'Knowledge (Geography)', 'Knowledge (History)', 'Knowledge (Local)', 'Knowledge (Nature)', 'Knowledge (Nobility)', 'Knowledge (Planes)',
      'Knowledge (Religion)', 'Linguistics', 'Spellcraft'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skills, 'Int', intSkills);

    const patchData = {
      abilities: this.tempChar.abilities,
      skills: this.tempChar.skills
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateWis(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.wis.update(info);
    this.tempChar.saving_throws.will.updateMod(this.tempChar.abilities.wis.useMod);

    const wisSkills = ['Heal', 'Perception', 'Profession1', 'Profession2', 'Sense Motive', 'Survival'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skills, 'Wis', wisSkills);

    const patchData = {
      abilities: this.tempChar.abilities,
      saving_throws: this.tempChar.saving_throws,
      skills: this.tempChar.skills
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateCha(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.cha.update(info);
    const chaSkills = ['Bluff', 'Diplomacy', 'Disguise', 'Handle Animal', 'Intimidate', 'Perform1', 'Perform2', 'Use Magic Device'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skills, 'Cha', chaSkills);

    const patchData = {
      abilities: this.tempChar.abilities,
      skills: this.tempChar.skills
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }
  //------------------------------------------------------
  //combat page updates-----------------------------------
  updateCombatInfo(info: CombatInfo, acDex: number, acArmor: number, acShield: number) {
    this.tempRollback();
    this.tempChar.combat_info = Object.assign(this.tempChar.combat_info, info);
    this.tempChar.combat_info.getCombatInfoTotals(this.tempChar.abilities, acDex, acArmor, acShield);

    const patchData = {
      combat_info: this.tempChar.combat_info
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateWeapons(weapons: Weapon[]) {
    this.tempRollback();
    //compare weight totals
    let newWeight = 0;
    weapons.forEach(weapon => newWeight += weapon.weight ?? 0);

    if (this.tempChar.combat_info.weaponsWeight !== newWeight) {
      this.tempChar.equipment.ac_items_weight = newWeight;
      const totalWeight = this.totService.getTotalWeight(this.tempChar.equipment.gear, weapons, this.tempChar.equipment.ac_items);
      this.checkBurdenUpdateSkills(totalWeight, this.tempChar.equipment.total_ac_penalty);
    }
    this.tempChar.combat_info.weapons = weapons;

    const patchData = {
      combat_info: this.tempChar.combat_info,
      equipment: this.tempChar.equipment
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }
  //------------------------------------------------------

  //charater updates ---------------------------------------
  updateGeneralInfo(generalInfo: GeneralInfo) {
    this.tempRollback();
    this.tempChar.general_info = generalInfo;
    let patchData = {};
    if (generalInfo.size !== null && generalInfo.size !== this.rollback.general_info.size) {
      this.tempChar.combat_info.updateSize(generalInfo.size);
      this.tempChar.equipment.money.cp = 10;
      this.tempChar.equipment.weight_caps.updateCarryCapacities(this.tempChar.abilities.str, generalInfo.size);
      patchData = { combat_info: this.tempChar.combat_info, equipment: this.tempChar.equipment };
    }

    patchData = { ...patchData, general_info: this.tempChar.general_info };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateSavingThrows(info: Throw, type: string) {
    this.tempRollback();
    switch (type) {
      case 'FOR':
        this.tempChar.saving_throws.fort.update(info);
        break;
      case 'REF':
        this.tempChar.saving_throws.ref.update(info);
        break;
      case 'WILL':
        this.tempChar.saving_throws.will.update(info);
        break;
    }

    const patchData = {
      saving_throws: this.tempChar.saving_throws
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }
  //-----------------------------------------------------------

  //Skill updates --------------------------------------------------
  updateSkillAbilities(abilities: Abilities, skills: Skill[], ability: string, skillIds: string[]) {
    const updatedSkillList = this.updateSkillAbilityScore(ability, skillIds, skills, abilities);
    this.tempChar.skills = this.totService.getSkillsTotals(updatedSkillList, skillIds);
  }

  updateSkills(skills: Skill[]) {
    this.tempRollback();
    this.tempChar.skills = skills;

    const patchData = {
      skills: this.tempChar.skills
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }
  //----------------------------------------------------------------
  //Equipment updates -----------------------------------------------
  updateMoney(info: Money) {
    this.tempRollback();
    this.tempChar.equipment.money = info;

    const patchData = {
      equipment: this.tempChar.equipment
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateGear(info: Gear[]) {
    this.tempRollback();

    let newWeight = 0;
    info.forEach(item => newWeight += (item.weight ?? 0) * (item.quantity ?? 0));

    if (this.tempChar.equipment.gear_weight !== newWeight) {
      this.tempChar.equipment.gear_weight = newWeight;
      const totalWeight = this.totService.getTotalWeight(info, this.tempChar.combat_info.weapons, this.tempChar.equipment.ac_items);
      this.checkBurdenUpdateSkills(totalWeight, this.tempChar.equipment.total_ac_penalty);
    }
    this.tempChar.equipment.gear = info;

    const patchData = {
      equipment: this.tempChar.equipment
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateAcItems(info: AcItem[]) {
    this.tempRollback();

    let patchData = {};
    //compare weight totals and get check penalties
    let newWeight = 0;
    let newAcPenalty = 0;
    info.forEach(ac => newWeight += ac.weight ?? 0);

    //calculate the current ac penalty
    info.forEach(ac => {
      if (ac.equipped) {
        (Math.abs(ac.check_pen ?? 0)) > newAcPenalty ? newAcPenalty = (Math.abs(ac.check_pen ?? 0)) : newAcPenalty;
      }
    });

    //if there isn't a difference in weight don't check for burden
    if (newWeight !== this.tempChar.equipment.ac_items_weight) {
      this.tempChar.equipment.ac_items_weight = newWeight;
      const totalWeight = this.totService.getTotalWeight(this.tempChar.equipment.gear, this.tempChar.combat_info.weapons, info);
      if (this.checkBurdenUpdateSkills(totalWeight, newAcPenalty)) {
        patchData = { skills: this.tempChar.skills };
      }
    }

    //if there is a difference in ac penalty update the skills
    else if (this.tempChar.equipment.total_ac_penalty !== newAcPenalty) {
      this.updateSkillcheck_penalty(this.tempChar.equipment.current_burden, newAcPenalty);
      patchData = { skills: this.tempChar.skills };
    }

    this.tempChar.equipment.total_ac_penalty = newAcPenalty;
    this.tempChar.equipment.ac_items = info;

    patchData = {
      ...patchData,
      equipment: this.tempChar.equipment
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }
  //----------------------------------------------------------------
  //Spell Updates --------------------------------------------------
  updateSpellCount(spell: Spell, spellCount: number, totalCount: number) {
    this.tempRollback();

    const spellIndex = this.tempChar.spells.spell_list.findIndex(s => s.name === spell.name);
    this.tempChar.spells.spell_list[spellIndex].usedCount = spellCount;
    this.tempChar.spells.spell_stats[spell.level].used = totalCount;

    const patchData = {
      spells: this.tempChar.spells
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  resetSpellCounts() {
    this.tempRollback();
    this.tempChar.spells.spell_list.forEach(spell => spell.usedCount = 0);
    this.tempChar.spells.spell_stats.forEach(stat => stat.used = 0);

    const patchData = {
      spells: this.tempChar.spells
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  addSpell(spell: Spell) {
    this.tempRollback();
    this.tempChar.spells.spell_list.push(spell);

    const patchData = {
      spells: this.tempChar.spells
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateSpell(spell: Spell) {
    this.tempRollback();

    this.tempChar.spells.spell_list = this.tempChar.spells.spell_list.map(s => {
      if (s.name === spell.name) {
        return spell;
      }
      return s;
    });

    const patchData = {
      spells: this.tempChar.spells
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  deleteSpell(spell: Spell | null) {
    this.tempRollback();
    this.tempChar.spells.spell_list = this.tempChar.spells.spell_list.filter(s => s.name !== spell?.name);

    const patchData = {
      spells: this.tempChar.spells
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateSpellStats(stats: SpellStat[] | undefined) {
    if (!stats) {
      return;
    }
    this.tempRollback();
    this.tempChar.spells.spell_stats = stats;

    const patchData = {
      spells: this.tempChar.spells
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  //----------------------------------------------------------------
  //Feat Updates ---------------------------------------------------
  addFeat(feat: Feat) {
    this.tempRollback();
    this.tempChar.feats.push(feat);

    const patchData = {
      feats: this.tempChar.feats
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  deleteFeat(feat: Feat | null) {
    this.tempRollback();
    this.tempChar.feats = this.tempChar.feats.filter(f => f.name !== feat?.name);

    const patchData = {
      feats: this.tempChar.feats
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateFeat(feat: Feat) {
    this.tempRollback();

    this.tempChar.feats = this.tempChar.feats.map(f => {
      if (f.name === feat.name) {
        return feat;
      }
      return f;
    });

    const patchData = {
      feats: this.tempChar.feats
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateFeatList(feats: Feat[]) {
    this.tempRollback();
    this.tempChar.feats = feats;

    const patchData = {
      feats: this.tempChar.feats
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  addSpecialAbility(specialAbility: SpecialAbility) {
    this.tempRollback();
    this.tempChar.special_abilities.push(specialAbility);

    const patchData = {
      special_abilities: this.tempChar.special_abilities
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  deleteSpecialAbility(specialAbility: SpecialAbility | null) {
    this.tempRollback();
    this.tempChar.special_abilities = this.tempChar.special_abilities.filter(sa => sa.name !== specialAbility?.name);

    const patchData = {
      special_abilities: this.tempChar.special_abilities
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateSpecialAbility(specialAbility: SpecialAbility) {
    this.tempRollback();

    this.tempChar.special_abilities = this.tempChar.special_abilities.map(sa => {
      if (sa.name === specialAbility.name) {
        return specialAbility;
      }
      return sa;
    });

    const patchData = {
      special_abilities: this.tempChar.special_abilities
    }

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  updateSpecailAbilityList(special_abilities: SpecialAbility[]) {
    this.tempRollback();
    this.tempChar.special_abilities = special_abilities;

    const patchData = {
      special_abilities: this.tempChar.special_abilities
    };

    this.http.updateCharacter(patchData, this.tempChar.id).pipe(catchError((err) => {
      this.snackBar.openSnackBar(err);
      this.character.next(this.rollback);
      return of(null);
    })).subscribe({
      next: () => {
        this.character.next(this.tempChar);
      }
    });
  }

  //----------------------------------------------------------------



  updateSkillAbilityScore(ability: string, skillIds: string[], skills: Skill[], abilities: Abilities): Skill[] {
    return skills.map(skill => {
      if (skillIds.some(s => s === skill.id)) {
        switch (ability) {
          case 'Dex':
            skill.ability_mod = abilities.dex.useMod || 0;
            break;
          case 'Str':
            skill.ability_mod = abilities.str.useMod || 0;
            break;
          case 'Wis':
            skill.ability_mod = abilities.wis.useMod || 0;
            break;
          case 'Int':
            skill.ability_mod = abilities.int.useMod || 0;
            break;
          case 'Cha':
            skill.ability_mod = abilities.cha.useMod || 0;
            break;
          case 'Con':
            skill.ability_mod = abilities.con.useMod || 0;
            break;
        }
      }
      return skill;
    });
  }

  updateSkillcheck_penalty(burden: burdenEnum, accheck_penalty: number) {
    const dex_strSkills = ['Acrobatics', 'Disable Device', 'Escape Artist', 'Fly', 'Ride', 'Sleight of Hand', 'Stealth', 'Climb', 'Swim'];
    const negativeAccheck_penalty = -Math.abs(accheck_penalty);
    let penalty = 0;
    switch (burden) {
      case burdenEnum.light:
        penalty = 0;
        break;
      case burdenEnum.medium:
        penalty = -3;
        break;
      case burdenEnum.heavy:
        penalty = -6;
        break;
    }

    const updatedSkills = this.tempChar.skills = this.tempChar.skills.map(skill => {
      if (dex_strSkills.some(s => s === skill.id)) {
        skill.check_penalty = penalty <= negativeAccheck_penalty ? penalty : negativeAccheck_penalty;
      }
      return skill;
    });

    this.tempChar.skills = this.totService.getSkillsTotals(updatedSkills, dex_strSkills);
  }

  checkBurdenUpdateSkills(totalWeight: number, accheck_penalty: number): boolean {
    const newBurden = this.totService.calculateEncumbrance(this.tempChar.equipment.weight_caps, totalWeight);
    if (newBurden !== this.tempChar.equipment.current_burden) {
      this.tempChar.equipment.current_burden = newBurden;
      this.updateSkillcheck_penalty(newBurden, accheck_penalty);
      return true;
    }
    return false;
  }
}
