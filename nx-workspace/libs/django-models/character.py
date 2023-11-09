from django.db import models
from django.pfBackend.characterApp.models import Abilities, CombatInfo, Equipment, GeneralInfo, SavingThrows, Skill, Spells, Feats, SpecialAbilities


class Character(models.Model):
    general_info = models.OneToOneField(GeneralInfo, on_delete=models.CASCADE)
    abilities = models.OneToOneField(Abilities, on_delete=models.CASCADE)
    saving_throws = models.OneToOneField(SavingThrows, on_delete=models.CASCADE)
    combat_info = models.OneToOneField(CombatInfo, on_delete=models.CASCADE)
    equipment = models.OneToOneField(Equipment, on_delete=models.CASCADE)
    skills = models.OneToOneField(Skill, on_delete=models.CASCADE)
    spells = models.OneToOneField(Spells, on_delete=models.CASCADE)
    feats = models.OneToOneField(Feats, on_delete=models.CASCADE)
    special_abilities = models.OneToOneField(SpecialAbilities, on_delete=models.CASCADE)
