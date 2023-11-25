# Generated by Django 4.2.7 on 2023-11-24 22:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0002_alter_specialability_character_alter_spell_spells_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abilities',
            name='cha',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cha_ability', to='character.ability'),
        ),
        migrations.AlterField(
            model_name='abilities',
            name='con',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='con_ability', to='character.ability'),
        ),
        migrations.AlterField(
            model_name='abilities',
            name='dex',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dex_ability', to='character.ability'),
        ),
        migrations.AlterField(
            model_name='abilities',
            name='int',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='int_ability', to='character.ability'),
        ),
        migrations.AlterField(
            model_name='abilities',
            name='str',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='str_ability', to='character.ability'),
        ),
        migrations.AlterField(
            model_name='abilities',
            name='wis',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wis_ability', to='character.ability'),
        ),
        migrations.AlterField(
            model_name='skill',
            name='character',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='skills', to='character.character'),
        ),
        migrations.AlterField(
            model_name='spellstat',
            name='spells',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='spell_stats', to='character.spells'),
        ),
    ]
