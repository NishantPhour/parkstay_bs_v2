# Generated by Django 3.2.18 on 2023-08-11 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parkstay', '0138_alter_mybookingnotice_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='mybookingnotice',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='notice',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
