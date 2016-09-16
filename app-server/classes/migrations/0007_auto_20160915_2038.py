# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-15 20:38
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0006_auto_20160915_1232'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='classsession',
            name='notifications',
        ),
        migrations.AddField(
            model_name='classsessionnotification',
            name='session',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='classes.ClassSession'),
            preserve_default=False,
        ),
    ]