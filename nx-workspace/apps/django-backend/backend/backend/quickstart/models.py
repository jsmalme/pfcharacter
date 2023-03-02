from django.db import models
from django.core.validators import MaxValueValidator


# Create your models here.
class Ability(models.Model):
    ability = models.IntegerField(validators=[MaxValueValidator(100)])
    mod = models.IntegerField(validators=[MaxValueValidator(100)])
    tempAdj = models.IntegerField(validators=[MaxValueValidator(100)])
    tempMod = models.IntegerField(validators=[MaxValueValidator(100)])
    useMod = models.IntegerField(validators=[MaxValueValidator(100)])

    def __str__(self):
        return "mod: " + self.useMod


class Weapon(models.Model):
    name = models.CharField(max_length=10)
    attackBonus = models.IntegerField(validators=[MaxValueValidator(100)])
    damage = models.CharField(max_length=10)
    critical = models.CharField(max_length=10)
    type = models.CharField(max_length=10)
    range = models.CharField(max_length=10)
    ammunition = models.CharField(max_length=10)
    weight = models.CharField(max_length=10)


class CombatInfo(models.Model):
    hpTotal = models.IntegerField(validators=[MaxValueValidator(100)])
    hpCurrent = models.IntegerField(validators=[MaxValueValidator(100)])
    hpNonLethal = models.CharField(max_length=10)
    bab = models.IntegerField(validators=[MaxValueValidator(100)])
    cmSizeMod = models.IntegerField(validators=[MaxValueValidator(100)])
    acSizeMod = models.IntegerField(validators=[MaxValueValidator(100)])
    spellResistance = models.CharField(max_length=10)
    damageReduction = models.CharField(max_length=10)
    initiativeTotal = models.IntegerField(validators=[MaxValueValidator(100)])
    initiativeMiscMod = models.IntegerField(validators=[MaxValueValidator(100)])
    cmbTotal = models.IntegerField(validators=[MaxValueValidator(100)])
    cmbBabMod = models.IntegerField(validators=[MaxValueValidator(100)])
    cmbMiscMod = models.IntegerField(validators=[MaxValueValidator(100)])
    cmdTotal = models.IntegerField(validators=[MaxValueValidator(100)])
    cmdBabMod = models.IntegerField(validators=[MaxValueValidator(100)])
    cmdMiscMod = models.IntegerField(validators=[MaxValueValidator(100)])
    acTotal = models.IntegerField(validators=[MaxValueValidator(100)])
    acArmorMod = models.IntegerField(validators=[MaxValueValidator(100)])
    acShieldMod = models.IntegerField(validators=[MaxValueValidator(100)])
    acNaturalArmorMod = models.IntegerField(validators=[MaxValueValidator(100)])
    acDeflectMod = models.IntegerField(validators=[MaxValueValidator(100)])
    acMiscMod = models.IntegerField(validators=[MaxValueValidator(100)])
    acTouch = models.IntegerField(validators=[MaxValueValidator(100)])
    acFlat = models.IntegerField(validators=[MaxValueValidator(100)])
    weapons = models.ForeignKey(Weapon, on_delete=models.CASCADE)


class GeneralInfo(models.Model):
    characterName: models.CharField(max_length=50)
    playerName: models.CharField(max_length=50)
    alignment: models.CharField(max_length=50)
    classLevel: models.CharField(max_length=50)
    deity: models.CharField(max_length=50)
    homeland: models.CharField(max_length=50)
    race: models.CharField(max_length=50)
    size: models.CharField(max_length=10)
    gender: models.CharField(max_length=50)
    age: models.IntegerField(max=10)
    height: models.CharField(max_length=50)
    weight: models.CharField(max_length=50)
    hair: models.CharField(max_length=50)
    eyes: models.CharField(max_length=50)
    baseSpeed: models.CharField(max_length=50)
    armorSpeed: models.CharField(max_length=50)
    flyManeuver: models.CharField(max_length=50)
    swimSpeed: models.CharField(max_length=50)
    climbSpeed: models.CharField(max_length=50)
    burrowSpeed: models.CharField(max_length=50)
    speedTempMods: models.CharField(max_length=50)
    languages: models.CharField(max_length=50)
    notes: models.CharField(max_length=500)


class Throw(models.Model):
    base = models.IntegerField(validators=[MaxValueValidator(100)])
    ability = models.IntegerField(validators=[MaxValueValidator(100)])
    magic = models.IntegerField(validators=[MaxValueValidator(100)])
    misc = models.IntegerField(validators=[MaxValueValidator(100)])
    temp = models.IntegerField(validators=[MaxValueValidator(100)])
    other = models.IntegerField(validators=[MaxValueValidator(100)])
    total = models.IntegerField(validators=[MaxValueValidator(100)])


class Skill(models.Model):
    id = models.CharField()
    name = models.CharField()
    classSkill = models.BooleanField()
    favorite = models.BooleanField()
    hasSkillName = models.BooleanField()
    trainedSkill = models.BooleanField()
    total = models.IntegerField(validators=[MaxValueValidator(100)])
    abilityName = models.CharField()
    abilityMod = models.IntegerField(validators=[MaxValueValidator(100)])
    classVal = models.IntegerField(validators=[MaxValueValidator(100)])
    ranks = models.IntegerField(validators=[MaxValueValidator(100)])
    racial = models.IntegerField(validators=[MaxValueValidator(100)])
    trait = models.IntegerField(validators=[MaxValueValidator(100)])
    misc = models.IntegerField(validators=[MaxValueValidator(100)])


class Abilities(models.Model):
    str = models.OneToOneField(Ability, on_delete=models.CASCADE)
    dex = models.OneToOneField(Ability, on_delete=models.CASCADE)
    con = models.OneToOneField(Ability, on_delete=models.CASCADE)
    int = models.OneToOneField(Ability, on_delete=models.CASCADE)
    wis = models.OneToOneField(Ability, on_delete=models.CASCADE)
    char = models.OneToOneField(Ability, on_delete=models.CASCADE)


class SavingThrows(models.Model):
    fort = models.OneToOneField(Throw, on_delete=models.CASCADE)
    ref = models.OneToOneField(Throw, on_delete=models.CASCADE)
    will = models.OneToOneField(Throw, on_delete=models.CASCADE)


class Character(models.Model):
    abilities = models.OneToOneField(Abilities, on_delete=models.CASCADE)
    generalInfo = models.OneToOneField(GeneralInfo, on_delete=models.CASCADE)
    combatInfo = models.OneToOneField(CombatInfo, on_delete=models.CASCADE)
    savingThrows = models.OneToOneField(SavingThrows, on_delete=models.CASCADE)
