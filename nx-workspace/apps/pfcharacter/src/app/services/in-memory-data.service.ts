/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { ICharacter } from 'libs/character-classes/character';
import { SizeEnum } from 'libs/character-classes/general-info';
import { Skill } from 'libs/character-classes/skills';
import { acTypeEnum, burdenEnum } from 'libs/character-classes/equipment';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    const character: ICharacter[] = [{
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
          weight: 5
        }]
      },
      equipment: {
        acItems: [{
          bonus: 10,
          checkPen: 2,
          name: 'longsword',
          properties: '',
          spellFailure: '10%',
          type: acTypeEnum.light,
          equipped: false,
          weight: 10,
          maxDex: 4,
        }],
        gear: [
          { name: 'rope', weight: 10 },
          { name: 'torch', weight: 3 }],
        money: {
          cp: 35,
          gp: 23,
          pp: 3,
          sp: 1
        },
        weightCaps: {
          dragOrPush: 0,
          heavyLoad: { min: 0, max: 0 },
          liftOffGround: 0,
          liftOverHead: 0,
          lightLoad: 0,
          medLoad: { min: 0, max: 0 },
        },
        currentBurden: burdenEnum.light,
        totalAcPenalty: 2
      },
      abilities: {
        str: {
          ability: 13,
          mod: 1,
          tempAdj: undefined,
          tempMod: undefined,
          useMod: 1
        },
        dex: {
          ability: 17,
          mod: 3,
          tempAdj: undefined,
          tempMod: undefined,
          useMod: 3
        },
        con: {
          ability: 15,
          mod: 2,
          tempAdj: undefined,
          tempMod: undefined,
          useMod: 2
        },
        int: {
          ability: 15,
          mod: 2,
          tempAdj: undefined,
          tempMod: undefined,
          useMod: 2
        },
        wis: {
          ability: 12,
          mod: 1,
          tempAdj: undefined,
          tempMod: undefined,
          useMod: 1
        },
        cha: {
          ability: 20,
          mod: 5,
          tempAdj: undefined,
          tempMod: undefined,
          useMod: 5
        }
      },
      savingThrows: {
        for: {
          base: 1,
          ability: 2,
          magic: undefined,
          misc: undefined,
          temp: undefined,
          other: undefined,
          total: 3
        },
        ref: {
          base: 1,
          ability: 2,
          magic: undefined,
          misc: undefined,
          temp: undefined,
          other: undefined,
          total: 3
        },
        will: {
          base: 1,
          ability: 2,
          magic: undefined,
          misc: undefined,
          temp: undefined,
          other: undefined,
          total: 3
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
