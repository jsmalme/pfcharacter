# Generated by Django 4.2.7 on 2023-11-29 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0002_feat'),
    ]

    operations = [
        migrations.CreateModel(
            name='Spell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('school', models.CharField(max_length=50)),
                ('level', models.CharField(max_length=500)),
                ('cast_time', models.CharField(max_length=100)),
                ('components', models.CharField(max_length=500)),
                ('range', models.CharField(max_length=200)),
                ('area', models.CharField(blank=True, max_length=500, null=True)),
                ('duration', models.CharField(max_length=200)),
                ('saving_throw', models.CharField(blank=True, max_length=200, null=True)),
                ('spell_resistance', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(max_length=5000)),
                ('short_description', models.CharField(max_length=500)),
                ('link', models.CharField(blank=True, max_length=500, null=True)),
            ],
        ),
    ]
