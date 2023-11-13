from rest_framework import serializers
from .models import AcItem, Character, CombatInfo, Equipment, Feat, Gear, GeneralInfo, Ability, Abilities, Money, Player, SavingThrows, Skill, SpecialAbility, SpellStat, Spells, Throw, Weapon, WeightCapacity

class GeneralInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralInfo
        fields = '__all__'

class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = '__all__'

class AbilitiesSerializer(serializers.ModelSerializer):
    str = AbilitySerializer()
    dex = AbilitySerializer()
    con = AbilitySerializer()
    int = AbilitySerializer()
    wis = AbilitySerializer()
    cha = AbilitySerializer()
    class Meta:
        model = Abilities
        fields = '__all__'

class ThrowSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Throw
        fields = '__all__'

class SavingThrowsSerializer(serializers.ModelSerializer):
    fort = ThrowSerializer()
    ref = ThrowSerializer()
    will = ThrowSerializer()
    class Meta: 
        model = SavingThrows
        fields = '__all__'

class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = '__all__'

class CombatInfoSerializer(serializers.ModelSerializer):
    weapons = WeaponSerializer(many=True)
    class Meta:
        model = CombatInfo
        fields = '__all__'

class MoneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Money
        fields = '__all__'

class GearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gear
        fields = '__all__'

class WeightCapacitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightCapacity
        fields = '__all__'

class AcItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcItem
        fields = '__all__'

class EquipmentSerializer(serializers.ModelSerializer):
    gear = GearSerializer(many=True)
    weapons = WeaponSerializer(many=True)
    money = MoneySerializer()
    weight_capacity = WeightCapacitySerializer()
    ac_items = AcItemSerializer(many=True)
    class Meta:
        model = Equipment
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SpellStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpellStat
        fields = '__all__'

class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spells
        fields = '__all__'

class SpellsSerializer(serializers.ModelSerializer):
    stats = SpellStatSerializer(many=True)
    spellList = SpellSerializer(many=True)
    class Meta:
        model = Spells
        fields = '__all__'

class FeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feat
        fields = '__all__'

class SpecialAbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialAbility
        fields = '__all__'

class CharacterSerializer(serializers.ModelSerializer):
    general_info = GeneralInfoSerializer()
    abilities = AbilitiesSerializer()
    saving_throws = SavingThrowsSerializer()
    combat_info = CombatInfoSerializer()
    equipment = EquipmentSerializer()
    skills = SkillSerializer(many=True)
    spells = SpellsSerializer()
    feats = FeatSerializer(many=True)
    special_abilities = SpecialAbilitySerializer(many=True)
    class Meta:
        model = Character
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many=True)
    class Meta:
        model = Player
        fields = ['username', 'email', 'password', 'characters']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = Player(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
