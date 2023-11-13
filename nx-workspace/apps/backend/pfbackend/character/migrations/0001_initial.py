# Generated by Django 4.2.7 on 2023-11-13 21:02

from django.conf import settings
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Abilities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Ability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ability', models.IntegerField(blank=True, null=True)),
                ('mod', models.IntegerField(blank=True, null=True)),
                ('temp_adj', models.IntegerField(blank=True, null=True)),
                ('temp_mod', models.IntegerField(blank=True, null=True)),
                ('use_mod', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('abilities', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='character.abilities')),
            ],
        ),
        migrations.CreateModel(
            name='CombatInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hp_total', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('hp_current', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('hp_non_lethal', models.CharField(blank=True, max_length=10, null=True)),
                ('bab', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('cm_size_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('ac_size_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('spell_resistance', models.CharField(blank=True, max_length=10, null=True)),
                ('damage_reduction', models.CharField(blank=True, max_length=10, null=True)),
                ('initiative_total', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('initiative_misc_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('cmb_total', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('cmb_bab_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('cmb_misc_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('cmd_total', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('cmd_bab_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('cmd_misc_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('ac_total', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('ac_natural_armor_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('ac_deflect_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('ac_misc_mod', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('ac_touch', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('ac_flat', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
            ],
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_ac_penalty', models.IntegerField(blank=True, null=True)),
                ('current_burden', models.CharField(blank=True, max_length=255, null=True)),
                ('ac_items_weight', models.FloatField(blank=True, null=True)),
                ('gear_weight', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='GeneralInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character_name', models.CharField(blank=True, max_length=50, null=True)),
                ('player_name', models.CharField(blank=True, max_length=50, null=True)),
                ('alignment', models.CharField(blank=True, max_length=50, null=True)),
                ('class_level', models.CharField(blank=True, max_length=50, null=True)),
                ('deity', models.CharField(blank=True, max_length=50, null=True)),
                ('homeland', models.CharField(blank=True, max_length=50, null=True)),
                ('race', models.CharField(blank=True, max_length=50, null=True)),
                ('size', models.CharField(blank=True, max_length=50, null=True)),
                ('gender', models.CharField(blank=True, max_length=50, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('height', models.CharField(blank=True, max_length=50, null=True)),
                ('weight', models.CharField(blank=True, max_length=50, null=True)),
                ('hair', models.CharField(blank=True, max_length=50, null=True)),
                ('eyes', models.CharField(blank=True, max_length=50, null=True)),
                ('base_speed', models.CharField(blank=True, max_length=50, null=True)),
                ('armor_speed', models.CharField(blank=True, max_length=50, null=True)),
                ('fly_maneuver', models.CharField(blank=True, max_length=50, null=True)),
                ('swim_speed', models.CharField(blank=True, max_length=50, null=True)),
                ('climb_speed', models.CharField(blank=True, max_length=50, null=True)),
                ('burrow_speed', models.CharField(blank=True, max_length=50, null=True)),
                ('speed_temp_mods', models.CharField(blank=True, max_length=50, null=True)),
                ('languages', models.CharField(blank=True, max_length=50, null=True)),
                ('notes', models.TextField(blank=True, max_length=500, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Money',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cp', models.IntegerField(blank=True, null=True)),
                ('sp', models.IntegerField(blank=True, null=True)),
                ('gp', models.IntegerField(blank=True, null=True)),
                ('pp', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Spells',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('domains_specialty', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Throw',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('base', models.IntegerField(blank=True, null=True)),
                ('ability', models.IntegerField(blank=True, null=True)),
                ('magic', models.IntegerField(blank=True, null=True)),
                ('misc', models.IntegerField(blank=True, null=True)),
                ('temp', models.IntegerField(blank=True, null=True)),
                ('other', models.IntegerField(blank=True, null=True)),
                ('total', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='WeightCapacity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('light_load', models.FloatField(blank=True, null=True)),
                ('med_load_min', models.FloatField(blank=True, null=True)),
                ('med_load_max', models.FloatField(blank=True, null=True)),
                ('heavy_load_min', models.FloatField(blank=True, null=True)),
                ('heavy_load_max', models.FloatField(blank=True, null=True)),
                ('lift_over_head', models.FloatField(blank=True, null=True)),
                ('lift_off_ground', models.FloatField(blank=True, null=True)),
                ('drag_or_push', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Weapon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('attack_bonus', models.IntegerField(blank=True, max_length=10, null=True)),
                ('damage', models.CharField(blank=True, max_length=10, null=True)),
                ('critical', models.CharField(blank=True, max_length=10, null=True)),
                ('type', models.CharField(blank=True, max_length=10, null=True)),
                ('range', models.CharField(blank=True, max_length=10, null=True)),
                ('ammunition', models.CharField(blank=True, max_length=10, null=True)),
                ('weight', models.FloatField(blank=True, null=True)),
                ('combat_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='weapons', to='character.combatinfo')),
            ],
        ),
        migrations.CreateModel(
            name='SpellStat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spellsPerDay', models.IntegerField(default=0)),
                ('spellsKnown', models.IntegerField(default=0)),
                ('saveDc', models.IntegerField(default=0)),
                ('bonusSpells', models.IntegerField(default=0)),
                ('used', models.IntegerField(default=0)),
                ('available', models.IntegerField(default=0)),
                ('totalSpellMarkers', models.IntegerField(default=0)),
                ('spells', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stats', to='character.spells')),
            ],
        ),
        migrations.CreateModel(
            name='Spell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('level', models.IntegerField(validators=[django.core.validators.MaxValueValidator(9)])),
                ('castTime', models.CharField(blank=True, max_length=255, null=True)),
                ('components', models.CharField(blank=True, max_length=255, null=True)),
                ('range', models.CharField(blank=True, max_length=255, null=True)),
                ('area', models.CharField(blank=True, max_length=255, null=True)),
                ('duration', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, max_length=500, null=True)),
                ('shortDescription', models.CharField(max_length=255)),
                ('link', models.CharField(blank=True, max_length=255, null=True)),
                ('school', models.CharField(blank=True, max_length=255, null=True)),
                ('savingThrow', models.CharField(blank=True, max_length=255, null=True)),
                ('spellResistance', models.CharField(blank=True, max_length=255, null=True)),
                ('usedCount', models.IntegerField(default=0)),
                ('spells', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='spellList', to='character.spells')),
            ],
        ),
        migrations.CreateModel(
            name='SpecialAbility',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('benefit', models.TextField(blank=True, max_length=500, null=True)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specialAbilities', to='character.character')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('class_skill', models.BooleanField(default=False)),
                ('favorite', models.BooleanField(default=False)),
                ('has_skill_name', models.BooleanField()),
                ('trained_skill', models.BooleanField()),
                ('total', models.IntegerField(default=0)),
                ('ability_name', models.CharField(max_length=255)),
                ('ability_mod', models.IntegerField(default=0)),
                ('class_bonus', models.IntegerField(default=0)),
                ('ranks', models.IntegerField(default=0)),
                ('racial_bonus', models.IntegerField(default=0)),
                ('trait_bonus', models.IntegerField(default=0)),
                ('misc_bonus', models.IntegerField(default=0)),
                ('check_penalty', models.IntegerField(default=0)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='skills', to='character.character')),
            ],
        ),
        migrations.CreateModel(
            name='SavingThrows',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fort', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='fort_throw', to='character.throw')),
                ('ref', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='ref_throw', to='character.throw')),
                ('will', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='will_throw', to='character.throw')),
            ],
        ),
        migrations.CreateModel(
            name='Gear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('weight', models.FloatField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(5000)])),
                ('quantity', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(5000)])),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gear', to='character.equipment')),
            ],
        ),
        migrations.CreateModel(
            name='Feat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=50)),
                ('benefit', models.TextField(blank=True, max_length=500, null=True)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feats', to='character.character')),
            ],
        ),
        migrations.AddField(
            model_name='equipment',
            name='money',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='character.money'),
        ),
        migrations.AddField(
            model_name='equipment',
            name='weight_caps',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='character.weightcapacity'),
        ),
        migrations.AddField(
            model_name='character',
            name='combat_info',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='character.combatinfo'),
        ),
        migrations.AddField(
            model_name='character',
            name='equipment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='character.equipment'),
        ),
        migrations.AddField(
            model_name='character',
            name='general_info',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='character.generalinfo'),
        ),
        migrations.AddField(
            model_name='character',
            name='player',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='characters', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='character',
            name='saving_throws',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='character.savingthrows'),
        ),
        migrations.AddField(
            model_name='character',
            name='spells',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='character.spells'),
        ),
        migrations.CreateModel(
            name='AcItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=20, null=True)),
                ('bonus', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('type', models.CharField(blank=True, max_length=255, null=True)),
                ('check_pen', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('spell_failure', models.CharField(blank=True, max_length=10, null=True)),
                ('properties', models.CharField(blank=True, max_length=50, null=True)),
                ('equipped', models.BooleanField(default=False)),
                ('weight', models.FloatField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(5000)])),
                ('max_dex', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(100)])),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ac_items', to='character.equipment')),
            ],
        ),
        migrations.AddField(
            model_name='abilities',
            name='cha',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='cha_ability', to='character.ability'),
        ),
        migrations.AddField(
            model_name='abilities',
            name='con',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='con_ability', to='character.ability'),
        ),
        migrations.AddField(
            model_name='abilities',
            name='dex',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='dex_ability', to='character.ability'),
        ),
        migrations.AddField(
            model_name='abilities',
            name='int',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='int_ability', to='character.ability'),
        ),
        migrations.AddField(
            model_name='abilities',
            name='str',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='str_ability', to='character.ability'),
        ),
        migrations.AddField(
            model_name='abilities',
            name='wis',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='wis_ability', to='character.ability'),
        ),
    ]
