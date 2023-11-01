import { Spell } from './../../../../../libs/character-classes/spells';
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
        }],
        weaponsWeight: 5
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
        acItemsWeight: 10,
        gear: [
          { name: 'rope', weight: 10, quantity: 3 },
          { name: 'torch', weight: 3, quantity: 1 }],
        gearWeight: 13,
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
        totalAcPenalty: 0
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
      spells: {
        modifiers: 'modifiers',
        domains_specialty: 'domains_specialty',
        spellList: [
          {
            name: 'Acid Fog',
            level: 1,
            castTime: '1 standard action',
            components: 'V, S, M, (powdered peas and an animal hoof)',
            range: 'medium (100 ft. + 10/ft./level)',
            area: '',
            duration: '1 round/level',
            description: 'You fire a small orb of acid at the target. You must succeed on a ranged touch attack to hit your target. The orb deals 1d3 points of acid damage. This acid disappears after 1 round.',
            shortDescription: ' Fog deals acid damage.',
            link: 'http://www.d20pfsrd.com/magic/all-spells/a/acid-fog',
            usedCount: 0,
            school: 'conjuration (creation)',
            savingThrow: 'none',
            spellResistance: 'no'
          },
          {
            name: 'Alarm',
            level: 1,
            castTime: '1 standard action',
            components: 'V, S, F/DF (a tiny bell and a piece of very fine silver wire)',
            range: 'close (25 ft. + 5 ft./2 levels)',
            area: '20-ft.-radius emanation centered on a point in space',
            duration: '2 hours/level',
            description: 'Alarm creates a subtle ward on an area you select. Once the spell effect is in place, it thereafter sounds a mental or audible alarm each time a creature of Tiny or larger size enters the warded area or touches it. A creature that speaks the password (determined by you at the time of casting) does not set off the alarm. You decide at the time of casting whether the alarm will be mental or audible in nature. Mental Alarm: A mental alarm alerts you (and only you) so long as you remain within 1 mile of the warded area. You note a single mental "ping" that awakens you from normal sleep but does not otherwise disturb concentration. A silence spell has no effect on a mental alarm. Audible Alarm: An audible alarm produces the sound of a hand bell, and anyone within 60 feet of the warded area can hear it clearly. Reduce the distance by 10 feet for each interposing closed door and by 20 feet for each substantial interposing wall. In quiet conditions, the ringing can be heard faintly as far as 180 feet away. The sound lasts for 1 round. Creatures within a silence spell cannot hear the ringing.  Ethereal or astral creatures do not trigger the alarm. Alarm can be made permanent with a permanency spell.',
            shortDescription: 'Wards an area for 2 hours/level.',
            link: 'http://www.d20pfsrd.com/magic/all-spells/a/alarm',
            usedCount: 0,
            school: 'abjuration',
            savingThrow: 'none',
            spellResistance: 'no'
          },
          {
            name: 'Animal Messenger',
            level: 2,
            castTime: '1 minue',
            components: 'V, S, M (a morsel of food the animal likes)',
            range: 'close (25 ft. + 5 ft./2 levels)',
            area: '20-ft.-radius emanation centered on a point in space',
            duration: '1 day/level',
            description: 'You compel a Tiny animal to go to a spot you designate. The most common use for this spell is to get an animal to carry a message to your allies. The animal cannot be one tamed or trained by someone else, including such creatures as familiars and animal companions.  Using some type of food desirable to the animal as a lure, you call the animal to you. It advances and awaits your bidding. You can mentally impress on the animal a certain place well known to you or an obvious landmark. The directions must be simple, because the animal depends on your knowledge and can\'t find a destination on its own.You can attach a small item or note to the messenger.The animal then goes to the designated location and waits there until the duration of the spell expires, whereupon it resumes its normal activities.During this period of waiting, the messenger allows others to approach it and remove any scroll or token it carries.The intended recipient gains no special ability to communicate with the animal or read any attached message(if it\'s written in a language he doesn\'t know, for example).',
            shortDescription: 'Sends a Tiny animal to a specific place.',
            link: 'http://www.d20pfsrd.com/magic/all-spells/a/animal-messenger',
            usedCount: 0,
            school: 'enchantment (compulsion) [mind-affecting]',
            savingThrow: 'none',
            spellResistance: 'yes'
          }],
        stats: [
          {
            spellsPerDay: 10,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 10,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          },
          {
            spellsPerDay: 0,
            spellsKnown: 0,
            saveDc: 0,
            bonusSpells: 0,
            used: 0,
            available: 0,
            totalSpellMarkers: 0
          }
        ]
      },
      feats: [],
      specialAbilities: [],
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
