import { strUnToNum } from "apps/pfcharacter/src/app/functions/methods";
import { Abilities } from "./abilities";

export interface ISavingThrows {
  fort: IThrow;
  ref: IThrow;
  will: IThrow;
}

export interface IThrow {
  base: number | null;
  ability: number | null;
  magic: number | null;
  misc: number | null;
  temp: number | null;
  other: number | null;
  total: number | null;
}

export class Throw implements IThrow {
  constructor(thr?: IThrow) {
    if (thr) {
      Object.assign(this, thr);
    }
  }

  base: number | null = null;
  ability: number | null = null;
  magic: number | null = null;
  misc: number | null = null;
  temp: number | null = null;
  other: number | null = null;
  total: number | null = null;

  updateMod(mod: number | null) {
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
      this.fort = new Throw(throws.fort);
      this.ref = new Throw(throws.ref);
      this.will = new Throw(throws.will);
    }
  }
  fort: Throw = new Throw();
  ref: Throw = new Throw();
  will: Throw = new Throw();
}
