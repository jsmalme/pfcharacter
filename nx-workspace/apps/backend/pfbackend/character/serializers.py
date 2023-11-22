from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import AcItem, Character, CombatInfo, Equipment, Feat, Gear, GeneralInfo, Ability, Abilities, Money, Player, SavingThrows, Skill, SpecialAbility, Spell, SpellStat, Spells, Throw, Weapon, WeightCapacity

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

    def create(self, validated_data):
        abilities_data = {
            'str': validated_data.pop('str'),
            'dex': validated_data.pop('dex'),
            'con': validated_data.pop('con'),
            'int': validated_data.pop('int'),
            'wis': validated_data.pop('wis'),
            'cha': validated_data.pop('cha'),
        }

        for field_name, field_data in abilities_data.items():
            field_serializer = AbilitySerializer(data=field_data)
            if field_serializer.is_valid():
                abilities_data[field_name] = field_serializer.save()
            else:
                raise serializers.ValidationError(f"{field_name} validation failed.")

        abilities = Abilities.objects.create(**validated_data, **abilities_data)

        return abilities

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

    def create(self, validated_data):
        saving_throws_data = {
            'fort': validated_data.pop('fort'),
            'ref': validated_data.pop('ref'),
            'will': validated_data.pop('will')
        }

        for field_name, field_data in saving_throws_data.items():
            field_serializer = ThrowSerializer(data=field_data)
            if field_serializer.is_valid():
                saving_throws_data[field_name] = field_serializer.save()
            else:
                raise serializers.ValidationError(f"{field_name} validation failed.")

        saving_throws = SavingThrows.objects.create(**validated_data, **saving_throws_data)

        return saving_throws

class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = '__all__'

class CombatInfoSerializer(serializers.ModelSerializer):
    weapons = WeaponSerializer(many=True)
    class Meta:
        model = CombatInfo
        fields = '__all__'
    
    def create(self, validated_data):
        weapons_data = validated_data.pop('weapons', [])
        combat_info = CombatInfo.objects.create(**validated_data)

        for weapon_data in weapons_data:
            weapon_serializer = WeaponSerializer(data=weapon_data)
            if weapon_serializer.is_valid():
                weapon_instance = weapon_serializer.save()
                combat_info.weapons.add(weapon_instance)
            else:
                raise serializers.ValidationError("Weapon validation failed.")

        return combat_info
    
    def update(self, instance, validated_data):
        weapons_data = validated_data.pop('weapons', [])
        combat_info = super().update(instance, validated_data)

        for weapon_data in weapons_data:
            weapon_serializer = WeaponSerializer(data=weapon_data)
            if weapon_serializer.is_valid():
                weapon_instance = weapon_serializer.save()
                combat_info.weapons.add(weapon_instance)
            else:
                raise serializers.ValidationError("Weapon validation failed.")

        return combat_info

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
    money = MoneySerializer()
    weight_caps = WeightCapacitySerializer()
    ac_items = AcItemSerializer(many=True)
    class Meta:
        model = Equipment
        fields = '__all__'

    def create(self, validated_data):
        gear_data = validated_data.pop('gear', [])
        money_data = validated_data.pop('money', {})
        weight_caps_data = validated_data.pop('weight_caps', {})
        ac_items_data = validated_data.pop('ac_items', [])

        equipment_instance = Equipment.objects.create(**validated_data)

        for gear_item_data in gear_data:
            Gear.objects.create(equipment=equipment_instance, **gear_item_data)

        money_instance = Money.objects.create(equipment=equipment_instance, **money_data)
        weight_caps_instance = WeightCapacity.objects.create(equipment=equipment_instance, **weight_caps_data)
        
        equipment_instance.money = money_instance
        equipment_instance.weight_caps = weight_caps_instance

        equipment_instance.save()

        for ac_item_data in ac_items_data:
            AcItem.objects.create(equipment=equipment_instance, **ac_item_data)

        return equipment_instance
    
    def update(self, instance, validated_data):
        gear_data = validated_data.pop('gear', [])
        money_data = validated_data.pop('money', {})
        weight_caps_data = validated_data.pop('weight_caps', {})
        ac_items_data = validated_data.pop('ac_items', [])

        for gear_item_data in gear_data:
            gear_item_id = gear_item_data.get('id', None)
            if gear_item_id:
                gear_item = Gear.objects.get(id=gear_item_id, equipment=instance)
                GearSerializer(gear_item, data=gear_item_data, partial=True).is_valid(raise_exception=True)
                GearSerializer(gear_item, data=gear_item_data, partial=True).save()
            else:
                Gear.objects.create(equipment=instance, **gear_item_data)

        money_instance = instance.money
        money_serializer = MoneySerializer(money_instance, data=money_data, partial=True)
        if money_serializer.is_valid(raise_exception=True):
            money_serializer.save()

        weight_caps_instance = instance.weight_caps
        weight_caps_serializer = WeightCapacitySerializer(weight_caps_instance, data=weight_caps_data, partial=True)
        if weight_caps_serializer.is_valid(raise_exception=True):
            weight_caps_serializer.save()

        for ac_item_data in ac_items_data:
            ac_item_id = ac_item_data.get('id', None)
            if ac_item_id:
                ac_item = AcItem.objects.get(id=ac_item_id, equipment=instance)
                AcItemSerializer(ac_item, data=ac_item_data, partial=True).is_valid(raise_exception=True)
                AcItemSerializer(ac_item, data=ac_item_data, partial=True).save()
            else:
                AcItem.objects.create(equipment=instance, **ac_item_data)

        instance = super().update(instance, validated_data)

        return instance

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        exclude = ['character']

class SpellStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpellStat
        fields = '__all__'

class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spell
        fields = '__all__'

class SpellsSerializer(serializers.ModelSerializer):
    spell_stats = SpellStatSerializer(many=True)
    spell_list = SpellSerializer(many=True)
    class Meta:
        model = Spells
        fields = '__all__'

    def create(self, validated_data):
        spell_stats_data = validated_data.pop('spell_stats', None)
        spell_list_data = validated_data.pop('spell_list', [])

        spells_instance = Spells.objects.create(**validated_data)

        if spell_stats_data:
            spell_stats_data.pop('spells_stat', None)
            spell_stat_instance, _ = SpellStat.objects.get_or_create(spells_stat=spells_instance, defaults=spell_stats_data)
            spells_instance.spell_stats = spell_stat_instance

        for spell_data in spell_list_data:
            spell_data.pop('spells', None)
            Spell.objects.create(spells=spells_instance, **spell_data)

        return spells_instance

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

    def create(self, validated_data):
        general_info_data = validated_data.pop('general_info')
        abilities_data = validated_data.pop('abilities')
        saving_throws_data = validated_data.pop('saving_throws')
        combat_info_data = validated_data.pop('combat_info')
        equipment_data = validated_data.pop('equipment')
        spells_data = validated_data.pop('spells')
        feats_data = validated_data.pop('feats')
        special_abilities_data = validated_data.pop('special_abilities')
        skills_data = validated_data.pop('skills')

        general_info = GeneralInfo.objects.create(**general_info_data)
        abilities = AbilitiesSerializer(data=abilities_data)
        saving_throws = SavingThrowsSerializer(data=saving_throws_data)
        combat_info = CombatInfoSerializer(data=combat_info_data)
        equipment = EquipmentSerializer(data=equipment_data)
        spells = SpellsSerializer(data=spells_data)

        if all(serializer.is_valid() for serializer in [abilities, saving_throws, combat_info, equipment, spells]):
            abilities_instance = abilities.save()
            saving_throws_instance = saving_throws.save()
            combat_info_instance = combat_info.save()
            equipment_instance = equipment.save()
            spells_instance = spells.save()

            character = Character.objects.create(
                general_info=general_info,
                abilities=abilities_instance,
                saving_throws=saving_throws_instance,
                combat_info=combat_info_instance,
                equipment=equipment_instance,
                spells=spells_instance,
                **validated_data
            )

            for skill in skills_data:
                skill['character'] = character.id
                skill_serializer = SkillSerializer(data=skill)
                if skill_serializer.is_valid():
                    skill_serializer.save()
                else:
                    print(skill_serializer.errors)
            for feat in feats_data:
                Feat.objects.create(character=character, **feat)
            for special_ability in special_abilities_data:
                SpecialAbility.objects.create(character=character, **special_ability)

            character.save()
            return character

        raise serializers.ValidationError("Validation failed.")
    
    def update(self, instance, validated_data):
        for field_name in self.fields.keys():
            if field_name in validated_data:
                nested_data = validated_data.pop(field_name, {})
                nested_instance = getattr(instance, field_name)
                nested_serializer_class = self.fields[field_name].__class__
                
                nested_serializer = nested_serializer_class(nested_instance, data=nested_data, partial=True)
                if nested_serializer.is_valid():
                    nested_serializer.save()

        # Update the main serializer instance
        instance = super().update(instance, validated_data)

        return instance

class PlayerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
class PlayerSerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many=True)
    class Meta:
        model = Player
        fields = ['id', 'username', 'email', 'characters']
        extra_kwargs = {'password': {'write_only': True}}

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['display_name'] = user.username
        # ...
        return token