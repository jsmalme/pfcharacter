# Generated by Django 4.2.7 on 2023-12-14 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0004_alter_player_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='display_name',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
