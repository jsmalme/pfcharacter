from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core import validators
from django.contrib.auth.models import AbstractUser, BaseUserManager
from rest_framework.authtoken.models import Token    

class PlayerManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email).lower()
        user = self.model(email=email, display_name=username **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        Token.objects.create(user=user)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
    
class CustomUserNameField(models.CharField):
    default_validators = [validators.validate_slug]

class Player(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)
    display_name = models.CharField(max_length=150, blank=True, null=True)
    objects = PlayerManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Character(models.Model):
    abilities = models.JSONField(blank=True, null=True)
    general_info = models.JSONField(blank=True, null=True)
    combat_info = models.JSONField(blank=True, null=True)
    saving_throws = models.JSONField(blank=True, null=True)
    equipment = models.JSONField(blank=True, null=True)
    spells = models.JSONField(blank=True, null=True)
    skills = models.JSONField(blank=True, null=True)
    feats = models.JSONField(blank=True, null=True)
    special_abilities = models.JSONField(blank=True, null=True)
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='characters', blank=True, null=True)

    def __str__(self):
        return f"Character {self.id}"
    
class Feat(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    description = models.TextField(max_length=2000, blank=True, null=True)
    prerequisites = models.CharField(max_length=500, blank=True, null=True)
    benefit = models.TextField(max_length=2000, blank=True, null=True)
    goal = models.TextField(max_length=2000, blank=True, null=True)
    completion_benefit = models.TextField(max_length=2000, blank=True, null=True)

class Spell(models.Model):
    name = models.CharField(max_length=50)
    school = models.CharField(max_length=50)
    level = models.CharField(max_length=500)
    cast_time = models.CharField(max_length=100)
    components = models.CharField(max_length=500)
    range = models.CharField(max_length=200)
    area = models.CharField(max_length=500, blank=True, null=True)
    duration = models.CharField(max_length=200)
    saving_throw = models.CharField(max_length=200, blank=True, null=True)
    spell_resistance = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=5000)
    short_description = models.CharField(max_length=500)
    link = models.CharField(max_length=500, blank=True, null=True)



    

    


# class GeneralInfo(models.Model):
#     character_name = models.CharField(max_length=50, blank=True, null=True)
#     player_name = models.CharField(max_length=50, blank=True, null=True)
#     alignment = models.CharField(max_length=50, blank=True, null=True)
#     class_level = models.CharField(max_length=50, blank=True, null=True)
#     deity = models.CharField(max_length=50, blank=True, null=True)
#     homeland = models.CharField(max_length=50, blank=True, null=True)
#     race = models.CharField(max_length=50, blank=True, null=True)
#     size = models.CharField(max_length=50, blank=True, null=True)
#     gender = models.CharField(max_length=50, blank=True, null=True)
#     age = models.IntegerField(blank=True, null=True)
#     height = models.CharField(max_length=50, blank=True, null=True)
#     weight = models.CharField(max_length=50, blank=True, null=True)
#     hair = models.CharField(max_length=50, blank=True, null=True)
#     eyes = models.CharField(max_length=50, blank=True, null=True)
#     base_speed = models.CharField(max_length=50, blank=True, null=True)
#     armor_speed = models.CharField(max_length=50, blank=True, null=True)
#     fly_maneuver = models.CharField(max_length=50, blank=True, null=True)
#     swim_speed = models.CharField(max_length=50, blank=True, null=True)
#     climb_speed = models.CharField(max_length=50, blank=True, null=True)
#     burrow_speed = models.CharField(max_length=50, blank=True, null=True)
#     speed_temp_mods = models.CharField(max_length=50, blank=True, null=True)
#     languages = models.CharField(max_length=50, blank=True, null=True)
#     notes = models.TextField(max_length=500, blank=True, null=True)

# class Ability(models.Model):
#     ability = models.IntegerField(blank=True, null=True)
#     mod = models.IntegerField(blank=True, null=True)
#     temp_adj = models.IntegerField(blank=True, null=True)
#     temp_mod = models.IntegerField(blank=True, null=True)
#     use_mod = models.IntegerField(blank=True, null=True)

# class Abilities(models.Model):
#     str = models.OneToOneField(Ability, related_name='str_ability', on_delete=models.CASCADE, null=True)
#     dex = models.OneToOneField(Ability, related_name='dex_ability', on_delete=models.CASCADE, null=True)
#     con = models.OneToOneField(Ability, related_name='con_ability', on_delete=models.CASCADE, null=True)
#     int = models.OneToOneField(Ability, related_name='int_ability', on_delete=models.CASCADE, null=True)
#     wis = models.OneToOneField(Ability, related_name='wis_ability', on_delete=models.CASCADE, null=True)
#     cha = models.OneToOneField(Ability, related_name='cha_ability', on_delete=models.CASCADE, null=True)

# class Throw(models.Model):
#     base = models.IntegerField(blank=True, null=True)
#     ability = models.IntegerField(blank=True, null=True)
#     magic = models.IntegerField(blank=True, null=True)
#     misc = models.IntegerField(blank=True, null=True)
#     temp = models.IntegerField(blank=True, null=True)
#     other = models.IntegerField(blank=True, null=True)
#     total = models.IntegerField(blank=True, null=True)

# class SavingThrows(models.Model):
#     fort = models.OneToOneField(Throw, related_name='fort_throw', on_delete=models.CASCADE)
#     ref = models.OneToOneField(Throw, related_name='ref_throw', on_delete=models.CASCADE)
#     will = models.OneToOneField(Throw, related_name='will_throw', on_delete=models.CASCADE)

# class CombatInfo(models.Model):
#     hp_total = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     hp_current = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     hp_non_lethal = models.CharField(max_length=10, blank=True, null=True)
#     bab = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     cm_size_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     ac_size_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     spell_resistance = models.CharField(max_length=10, blank=True, null=True)
#     damage_reduction = models.CharField(max_length=10, blank=True, null=True)
#     initiative_total = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     initiative_misc_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     cmb_total = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     cmb_bab_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     cmb_misc_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     cmd_total = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     cmd_bab_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     cmd_misc_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     ac_total = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     ac_natural_armor_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     ac_deflect_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     ac_misc_mod = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     ac_touch = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     ac_flat = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])

# class Weapon(models.Model):
#     name = models.CharField(max_length=50, blank=True, null=True)
#     attack_bonus = models.IntegerField(max_length=10, blank=True, null=True)
#     damage = models.CharField(max_length=10, blank=True, null=True)
#     critical = models.CharField(max_length=10, blank=True, null=True)
#     type = models.CharField(max_length=10, blank=True, null=True)
#     range = models.CharField(max_length=10, blank=True, null=True)
#     ammunition = models.CharField(max_length=10, blank=True, null=True)
#     weight = models.FloatField(blank=True, null=True)
#     combat_info = models.ForeignKey(CombatInfo, on_delete=models.CASCADE, related_name='weapons')

# class AcItem(models.Model):
#     name = models.CharField(max_length=20, blank=True, null=True)
#     bonus = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     type = models.CharField(max_length=255, blank=True, null=True)
#     check_pen = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     spell_failure = models.CharField(max_length=10, blank=True, null=True)
#     properties = models.CharField(max_length=50, blank=True, null=True)
#     equipped = models.BooleanField(default=False)
#     weight = models.FloatField(blank=True, null=True, validators=[MaxValueValidator(5000)])
#     max_dex = models.IntegerField(blank=True, null=True, validators=[MaxValueValidator(100)])
#     equipment = models.ForeignKey('Equipment', on_delete=models.CASCADE, related_name='ac_items')

# class Gear(models.Model):
#     name = models.CharField(max_length=50, blank=True, null=True)
#     weight = models.FloatField(blank=True, null=True, validators=[MaxValueValidator(5000)])
#     quantity = models.IntegerField(default=1, validators=[MaxValueValidator(5000)])
#     equipment = models.ForeignKey('Equipment', on_delete=models.CASCADE, related_name='gear')

# class Money(models.Model):
#     cp = models.IntegerField(blank=True, null=True)
#     sp = models.IntegerField(blank=True, null=True)
#     gp = models.IntegerField(blank=True, null=True)
#     pp = models.IntegerField(blank=True, null=True)

# class WeightCapacity(models.Model):
#     light_load = models.FloatField(blank=True, null=True)
#     med_load_min = models.FloatField(blank=True, null=True)
#     med_load_max = models.FloatField(blank=True, null=True)
#     heavy_load_min = models.FloatField(blank=True, null=True)
#     heavy_load_max = models.FloatField(blank=True, null=True)
#     lift_over_head = models.FloatField(blank=True, null=True)
#     lift_off_ground = models.FloatField(blank=True, null=True)
#     drag_or_push = models.FloatField(blank=True, null=True)

# class Equipment(models.Model):
#     money = models.OneToOneField(Money, on_delete=models.CASCADE, blank=True, null=True)
#     weight_caps = models.OneToOneField(WeightCapacity, on_delete=models.CASCADE, blank=True, null=True)
#     total_ac_penalty = models.IntegerField(blank=True, null=True)
#     current_burden = models.CharField(max_length=255, blank=True, null=True)
#     ac_items_weight = models.FloatField(blank=True, null=True)
#     gear_weight = models.FloatField(blank=True, null=True)

# class Skill(models.Model):
#     name = models.CharField(max_length=255)
#     class_skill = models.BooleanField(default=False)
#     favorite = models.BooleanField(default=False)
#     has_skill_name = models.BooleanField()
#     trained_skill = models.BooleanField()
#     total = models.IntegerField(default=0)
#     ability_name = models.CharField(max_length=255)
#     ability_mod = models.IntegerField(default=0)
#     class_bonus = models.IntegerField(default=0)
#     ranks = models.IntegerField(default=0)
#     racial_bonus = models.IntegerField(default=0)
#     trait_bonus = models.IntegerField(default=0)
#     misc_bonus = models.IntegerField(default=0)
#     check_penalty = models.IntegerField(default=0)
#     character = models.ForeignKey('Character', on_delete=models.CASCADE, related_name='skills', blank=True, null=True)

# class Spells(models.Model):
#     modifiers: models.CharField(max_length=255, blank=True, null=True)
#     domains_specialty = models.CharField(max_length=255, blank=True, null=True)

# class SpellStat(models.Model):
#     spellsPerDay = models.IntegerField(default=0)
#     spellsKnown = models.IntegerField(default=0)
#     saveDc = models.IntegerField(default=0)
#     bonusSpells = models.IntegerField(default=0)
#     used = models.IntegerField(default=0)
#     available = models.IntegerField(default=0)
#     totalSpellMarkers = models.IntegerField(default=0)
#     spells = models.ForeignKey(Spells, on_delete=models.CASCADE, related_name='spell_stats', blank=True, null=True)

# class Spell(models.Model):
#     name = models.CharField(max_length=50)
#     level = models.IntegerField(validators=[MaxValueValidator(9)])
#     castTime = models.CharField(max_length=255, blank=True, null=True)
#     components = models.CharField(max_length=255, blank=True, null=True)
#     range = models.CharField(max_length=255, blank=True, null=True)
#     area = models.CharField(max_length=255, blank=True, null=True)
#     duration = models.CharField(max_length=255, blank=True, null=True)
#     description = models.TextField(max_length=500, blank=True, null=True)
#     shortDescription = models.CharField(max_length=255)
#     link = models.CharField(max_length=255, blank=True, null=True)
#     school = models.CharField(max_length=255, blank=True, null=True)
#     savingThrow = models.CharField(max_length=255, blank=True, null=True)
#     spellResistance = models.CharField(max_length=255, blank=True, null=True)
#     usedCount = models.IntegerField(default=0)
#     spells = models.ForeignKey(Spells, on_delete=models.CASCADE, related_name='spell_list')

# class Feat(models.Model):
#     name = models.CharField(max_length=50)
#     type = models.CharField(max_length=50)
#     prerequisites: models.CharField(max_length=100, blank=True, null=True)
#     benefit = models.TextField(max_length=500, blank=True, null=True)
#     character = models.ForeignKey('Character', on_delete=models.CASCADE, related_name='feats')

# class SpecialAbility(models.Model):
#     name = models.CharField(max_length=50)
#     benefit = models.TextField(max_length=500, blank=True, null=True)
#     character = models.ForeignKey('Character', on_delete=models.CASCADE, related_name='special_abilities')

# class Character(models.Model):
#     general_info = models.OneToOneField(GeneralInfo, on_delete=models.CASCADE)
#     abilities = models.OneToOneField(Abilities, on_delete=models.CASCADE)
#     saving_throws = models.OneToOneField(SavingThrows, on_delete=models.CASCADE)
#     combat_info = models.OneToOneField(CombatInfo, on_delete=models.CASCADE)
#     equipment = models.OneToOneField(Equipment, on_delete=models.CASCADE)
#     spells = models.OneToOneField(Spells, on_delete=models.CASCADE)
#     player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='characters', blank=True, null=True)
