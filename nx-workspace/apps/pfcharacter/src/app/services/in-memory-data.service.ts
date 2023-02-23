/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Character } from 'libs/character-classes/character';
import { SizeEnum } from 'libs/character-classes/general-info';
import { Skill } from 'libs/character-classes/skills';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    const character = [{
      id: 1,
      generalInfo: {
        age: 27,
        alignment: "Chaotic Good",
        characterName: "Belripostious",
        classLevel: "Sorcerer - Level 14",
        deity: "Beepity Bop",
        eyes: "Red",
        gender: "Male",
        hair: "Purple",
        height: "6'7",
        homeland: "Gnor",
        notes: `-This character is my favorite.\n-He is also very crazy, don't mess with this boy.`,
        playerName: "Sir Joseph of Alconbury",
        race: "Dark Elf",
        size: SizeEnum.medium,
        weight: "240",
        baseSpeed: '30',
        armorSpeed: '20',
        flyManeuver: '10',
        swimSpeed: '10',
        climbSpeed: '10',
        burrowSpeed: '5',
        speedTempMods: '0',
        languages: 'elven, normal, dwarven'
      },
      combatInfo: {
        bab: 3,
        cmbMiscMod: 0,
        cmSizeMod: 0,
        acSizeMod: 0,
        cmbTotal: 3,
        initiativeMiscMod: 0,
        initiativeTotal: 5,
        hpTotal: 20,
        hpCurrent: 18,
        hpNonLethal: '2',
        spellResistance: '10',
        damageReduction: '10',
        cmbBabMod: 10,
        cmdTotal: 10,
        cmdBabMod: 10,
        cmdMiscMod: 10,
        acTotal: 10,
        acArmorMod: 10,
        acShieldMod: 10,
        acNaturalArmorMod: 10,
        acDeflectMod: 10,
        acMiscMod: 10,
        acTouch: 10,
        acFlat: 10,
        weapons: [{
          ammunition: 'none',
          attackBonus: 6,
          critical: 'x3',
          damage: '2d6',
          name: 'weapon number one',
          range: '5ft',
          type: 'P',
          weight: '5'
        }]
      },
      abilities: {
        str: 13,
        strMod: 1,
        strTempAdj: undefined,
        strTempMod: undefined,
        dex: 17,
        dexMod: 3,
        dexTempAdj: undefined,
        dexTempMod: undefined,
        con: 15,
        conMod: 2,
        conTempAdj: undefined,
        conTempMod: undefined,
        int: 15,
        intMod: 2,
        intTempAdj: undefined,
        intTempMod: undefined,
        wis: 12,
        wisMod: 1,
        wisTempAdj: undefined,
        wisTempMod: undefined,
        cha: 20,
        chaMod: 5,
        chaTempAdj: undefined,
        chaTempMod: undefined,
        useStrMod: 1,
        useDexMod: 3,
        useConMod: 2,
        useIntMod: 2,
        useWisMod: 1,
        useChaMod: 5
      },
      savingThrows: {
        for: {
          forBase: 1,
          forAbility: 2,
          forMagic: undefined,
          forMisc: undefined,
          forTemp: undefined,
          forOther: undefined,
          forTotal: 3
        },
        ref: {
          refBase: 2,
          refAbility: 3,
          refMagic: 2,
          refMisc: undefined,
          refTemp: undefined,
          refOther: undefined,
          refTotal: 7
        },
        will: {
          willBase: 3,
          willAbility: 1,
          willMagic: undefined,
          willMisc: 1,
          willTemp: 1,
          willOther: undefined,
          willTotal: 6
        }
      },
      skillList: [
        new Skill('Acrobatics', 'Dex'),
        new Skill('Appraise', 'Int'),
        new Skill('Bluff', 'Cha'),
        new Skill('Climb', 'Str'),
        new Skill('Craft1', 'Int', false, true),
        new Skill('Craft2', 'Int', false, true),
        new Skill('Craft3', 'Int', false, true),
        new Skill('Diplomacy', 'Cha'),
        new Skill('Disable Device', 'Dex', true),
        new Skill('Disguise', 'Cha'),
        new Skill('Escape Artist', 'Dex'),
        new Skill('Fly', 'Dex'),
        new Skill('Handle Animal', 'Cha', true),
        new Skill('Heal', 'Wis'),
        new Skill('Intimidate', 'Cha'),
        new Skill('Knowledge (Arcana)', 'Int', true),
        new Skill('Knowledge (Dungeoneering)', 'Int', true),
        new Skill('Knowledge (Engineering)', 'Int', true),
        new Skill('Knowledge (Geography)', 'Int', true),
        new Skill('Knowledge (History)', 'Int', true),
        new Skill('Knowledge (Local)', 'Int', true),
        new Skill('Knowledge (Nature)', 'Int', true),
        new Skill('Knowledge (Nobility)', 'Int', true),
        new Skill('Knowledge (Planes)', 'Int', true),
        new Skill('Knowledge (Religion)', 'Int', true),
        new Skill('Linguistics', 'Int', true),
        new Skill('Perception', 'Wis'),
        new Skill('Perform1', 'Cha', false, true),
        new Skill('Perform2', 'Cha', false, true),
        new Skill('Profession1', 'Wis', true, true),
        new Skill('Profession2', 'Wis', true, true),
        new Skill('Ride', 'Dex'),
        new Skill('Sense Motive', 'Wis'),
        new Skill('Sleight of Hand', 'Dex', true),
        new Skill('Spellcraft', 'Int', true),
        new Skill('Stealth', 'Dex'),
        new Skill('Survival', 'Wis'),
        new Skill('Swim', 'Str'),
        new Skill('Use Magic Device', 'Cha', true)
      ]
    }]
    return { character: character };
  }
}
