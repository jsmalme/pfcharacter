from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AbilitiesSerializer, CharacterSerializer, CombatInfoSerializer, EquipmentSerializer, FeatSerializer, GeneralInfoSerializer, PlayerSerializer, SavingThrowsSerializer, SkillSerializer, SpecialAbilitySerializer, SpellsSerializer
from .models import Abilities, Character, CombatInfo, Equipment, Feat, GeneralInfo, Player, SavingThrows, Skill, SpecialAbility, Spells

class GeneralInfoViewSet(viewsets.ModelViewSet):
    queryset = GeneralInfo.objects.all()
    serializer_class = GeneralInfoSerializer

class AbilitiesViewSet(viewsets.ModelViewSet):
    queryset = Abilities.objects.all()
    serializer_class = AbilitiesSerializer

class SavingThrowsViewSet(viewsets.ModelViewSet):
    queryset = SavingThrows.objects.all()
    serializer_class = SavingThrowsSerializer

class CombatInfoViewSet(viewsets.ModelViewSet):
    queryset = CombatInfo.objects.all()
    serializer_class = CombatInfoSerializer

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class SpellsViewSet(viewsets.ModelViewSet):
    queryset = Spells.objects.all()
    serializer_class = SpellsSerializer

class FeatViewSet(viewsets.ModelViewSet):
    queryset = Feat.objects.all()
    serializer_class = FeatSerializer

class SpecialAbilityViewSet(viewsets.ModelViewSet):
    queryset = SpecialAbility.objects.all()
    serializer_class = SpecialAbilitySerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
