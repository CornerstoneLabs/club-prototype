# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-17 15:22
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('classes', '0008_class_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='max_participants',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='class',
            name='participants',
            field=models.ManyToManyField(blank=True, related_name='participant', to=settings.AUTH_USER_MODEL),
        ),
    ]