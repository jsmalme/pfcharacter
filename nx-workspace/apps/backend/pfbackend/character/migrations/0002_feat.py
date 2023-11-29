# Generated by Django 4.2.7 on 2023-11-29 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, max_length=2000, null=True)),
                ('prerequisites', models.CharField(blank=True, max_length=500, null=True)),
                ('benefit', models.TextField(blank=True, max_length=2000, null=True)),
                ('goal', models.TextField(blank=True, max_length=2000, null=True)),
                ('completion_benefit', models.TextField(blank=True, max_length=2000, null=True)),
            ],
        ),
    ]
