# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2018-05-24 05:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basket', '0012_auto_20170920_1618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='line',
            name='price_excl_tax',
            field=models.DecimalField(decimal_places=12, max_digits=22, null=True, verbose_name='Price excl. Tax'),
        ),
    ]
