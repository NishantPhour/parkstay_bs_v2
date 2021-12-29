# Generated by Django 3.2.10 on 2021-12-25 14:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('parkstay', '0117_campsitebookinglegacy_campsite_booking_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='campsitebookinglegacy',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='campsitebookinglegacy',
            name='updated',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
