from rest_framework import serializers
from models import (
    Ability,
    Abilities,
    Character,
    CombatInfo,
    GeneralInfo,
    Throw,
    SavingThrows,
    Skill,
)


class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = "__all__"


class AbilitiesSerializer(serializers.ModelSerializer):
    str = AbilitySerializer()
    dex = AbilitySerializer()
    con = AbilitySerializer()
    int = AbilitySerializer()
    wis = AbilitySerializer()
    char = AbilitySerializer()

    class Meta:
        model = Abilities
        fields = "__all__"


class ThrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Throw
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class SavingThrowsSerializer(serializers.ModelSerializer):
    fort = ThrowSerializer()
    ref = ThrowSerializer()
    will = ThrowSerializer()

    class Meta:
        model = SavingThrows
        fields = "__all__"


class CombatInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CombatInfo
        fields = "__all__"


class GeneralInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralInfo
        fields = "__all__"


class CharacterSerializer(serializers.ModelSerializer):
    abilities = AbilitiesSerializer()
    generalInfo = GeneralInfoSerializer()

    class Meta:
        model = Character
        fields = "__all__"
