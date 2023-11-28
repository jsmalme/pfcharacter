export interface IAbilities {
  str: IAbility;
  dex: IAbility;
  con: IAbility;
  int: IAbility;
  wis: IAbility;
  cha: IAbility;
}

export interface IAbility {
  ability: number | null;
  mod: number | null;
  tempAdj: number | null;
  tempMod: number | null;
  useMod: number | null;
}

export class Ability implements IAbility {
  constructor(ability?: IAbility) {
    if (ability) {
      this.ability = ability.ability;
      this.mod = ability.mod;
      this.tempAdj = ability.tempAdj;
      this.tempMod = ability.tempMod;
      this.useMod = ability.useMod;
    }
    else {
      this.ability = 0;
      this.mod = 0;
      this.tempAdj = null;
      this.tempMod = null;
      this.useMod = 0;
    }
  }
  ability: number | null = null;
  mod: number | null = null;
  tempAdj: number | null = null;
  tempMod: number | null = null;
  useMod: number | null = null;

  update(info: Ability) {
    this.ability = info.ability;
    this.tempAdj = info.tempAdj;
    this.mod = this.calculateAbilityScore(info.ability);
    this.tempMod = this.calculateAbilityScore(info.tempAdj);
    this.useMod = info.tempAdj ? this.tempMod : (info.ability ? this.mod : null);
  }

  private calculateAbilityScore(score: number | null): number | null {
    if (score === null || "") {
      return null;
    }
    return Math.floor((score - 10) / 2);
  }
}

export class Abilities implements IAbilities {
  constructor(abilities?: IAbilities) {
    if (abilities) {
      this.str = new Ability(abilities.str);
      this.dex = new Ability(abilities.dex);
      this.con = new Ability(abilities.con);
      this.int = new Ability(abilities.int);
      this.wis = new Ability(abilities.wis);
      this.cha = new Ability(abilities.cha);
    }
  }
  str: Ability = new Ability();
  dex: Ability = new Ability();
  con: Ability = new Ability();
  int: Ability = new Ability();
  wis: Ability = new Ability();
  cha: Ability = new Ability();
}

export class ChaScore {
  cha: number | null;
  chaTempAdj: number | null;
}

export class WisScore {
  wis: number | null;
  wisTempAdj: number | null;
}

export class IntScore {
  int: number | null;
  intTempAdj: number | null;
}

export class ConScore {
  con: number | null;
  conTempAdj: number | null;
}

export class DexScore {
  dex: number | null;
  dexTempAdj: number | null;
}

export class StrScore {
  str: number | null;
  strTempAdj: number | null;
}
