export interface IAbilities {
  str: IAbility;
  dex: IAbility;
  con: IAbility;
  int: IAbility;
  wis: IAbility;
  cha: IAbility;
}

export interface IAbility {
  ability: number | undefined;
  mod: number | undefined;
  tempAdj: number | undefined;
  tempMod: number | undefined;
  useMod: number | undefined; 
}

export class Ability implements IAbility{
  constructor(ability?: IAbility){
    if(ability){
      this.ability = ability.ability;
      this.mod = ability.mod;
      this.tempAdj = ability.tempAdj;
      this.tempMod = ability.tempMod;
      this.useMod = ability.useMod;
    }
  }
  ability: number | undefined = undefined;
  mod: number | undefined = undefined;
  tempAdj: number | undefined = undefined;
  tempMod: number | undefined = undefined;
  useMod: number | undefined = undefined; 

  update(info: Ability){
    console.log(info);
    this.ability = info.ability;
    this.tempAdj = info.tempAdj;
    this.mod = this.calculateAbilityScore(info.ability);
    this.tempMod = this.calculateAbilityScore(info.tempAdj);

    console.log(`${this.ability}, ${this.tempAdj}, ${this.mod}, ${this.tempMod}`);
    this.useMod = info.tempAdj ? this.tempMod : (info.ability ? this.mod : undefined);
  }

  private calculateAbilityScore(score: number | undefined): number | undefined {
    if (score === undefined || "") {
      return undefined;
    }
    return Math.floor((score - 10) / 2);
  }
}
export class Abilities implements IAbilities {
  constructor(abilities?: IAbilities){
    if(abilities){
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
  cha: number | undefined;
  chaTempAdj: number | undefined;
}

export class WisScore {
  wis: number | undefined;
  wisTempAdj: number | undefined;
}

export class IntScore {
  int: number | undefined;
  intTempAdj: number | undefined;
}

export class ConScore {
  con: number | undefined;
  conTempAdj: number | undefined;
}

export class DexScore {
  dex: number | undefined;
  dexTempAdj: number | undefined;
}

export class StrScore {
  str: number | undefined;
  strTempAdj: number | undefined;
}
