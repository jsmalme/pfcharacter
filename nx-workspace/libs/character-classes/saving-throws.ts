import { strUnToNum } from "apps/pfcharacter/src/app/functions/methods";
import { Abilities } from "./abilities";

export interface ISavingThrows {
  for: IThrow;
  ref: IThrow;
  will: IThrow;
}

export interface IThrow {
  base: number | undefined;
  ability: number | undefined;
  magic: number | undefined;
  misc: number | undefined;
  temp: number | undefined;
  other: number | undefined;
  total: number | undefined;
}

export class Throw implements IThrow {
  constructor(thr?: IThrow) {
    if (thr) {
      Object.assign(this, thr);
    }
  }

  base: number | undefined = undefined;
  ability: number | undefined = undefined;
  magic: number | undefined = undefined;
  misc: number | undefined = undefined;
  temp: number | undefined = undefined;
  other: number | undefined = undefined;
  total: number | undefined = undefined;

  updateMod(mod: number | undefined) {
    this.ability = mod;
    this.updateTotal();
  }

  update(sThrow: Throw) {
    this.base = sThrow.base;
    this.magic = sThrow.magic;
    this.misc = sThrow.misc;
    this.temp = sThrow.temp;
    this.other = sThrow.other;
    this.updateTotal();
  }

  private updateTotal() {
    this.total = strUnToNum(this.base) +
      strUnToNum(this.ability) +
      strUnToNum(this.magic) +
      strUnToNum(this.misc) +
      strUnToNum(this.temp) +
      strUnToNum(this.other);
  }
}

export class SavingThrows implements ISavingThrows {
  constructor(throws?: ISavingThrows) {
    if (throws) {
      this.for = new Throw(throws.for);
      this.ref = new Throw(throws.ref);
      this.will = new Throw(throws.will);
    }
  }
  for: Throw = new Throw();
  ref: Throw = new Throw();
  will: Throw = new Throw();
}
