export class Abilities {
  str: number | undefined;
  strMod: number | undefined;
  strTempAdj: number | undefined;
  strTempMod: number | undefined;
  useStrMod: number | undefined;
  dex: number | undefined;
  dexMod: number | undefined;
  dexTempAdj: number | undefined;
  dexTempMod: number | undefined;
  useDexMod: number | undefined;
  con: number | undefined;
  conMod: number | undefined;
  conTempAdj: number | undefined;
  conTempMod: number | undefined;
  useConMod: number | undefined;
  int: number | undefined;
  intMod: number | undefined;
  intTempAdj: number | undefined;
  intTempMod: number | undefined;
  useIntMod: number | undefined;
  wis: number | undefined;
  wisMod: number | undefined;
  wisTempAdj: number | undefined;
  wisTempMod: number | undefined;
  useWisMod: number | undefined;
  cha: number | undefined;
  chaMod: number | undefined;
  chaTempAdj: number | undefined;
  chaTempMod: number | undefined;
  useChaMod: number | undefined;

  updateStr(info: Abilities) {
    this.str = info.str;
    this.strTempAdj = info.strTempAdj;
    this.strMod = this.calculateAbilityScore(info.str);
    this.strTempMod = this.calculateAbilityScore(info.strTempAdj);
    this.useStrMod = info.strTempAdj ? this.strTempMod : (info.str ? this.strMod : undefined);
  }

  updateDex(info: Abilities) {
    this.dex = info.dex;
    this.dexTempAdj = info.dexTempAdj;
    this.dexMod = this.calculateAbilityScore(info.dex);
    this.dexTempMod = this.calculateAbilityScore(info.dexTempAdj);
    this.useDexMod = info.dexTempAdj ? this.dexTempMod : (info.dex ? this.dexMod : undefined);
  }




  private calculateAbilityScore(score: number | undefined): number | undefined {
    if (score === undefined || "") {
      return undefined;
    }
    return Math.floor((score - 10) / 2);
  }
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
