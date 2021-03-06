# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-03 22:08
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('brand', '0003_auto_20160921_1949'),
    ]

    operations = [
        migrations.AddField(
            model_name='brand',
            name='admins',
            field=models.ManyToManyField(blank=True, related_name='brand_admin', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='brand',
            name='participants',
            field=models.ManyToManyField(blank=True, related_name='brand_participant', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='brand',
            name='validated',
            field=models.ManyToManyField(blank=True, related_name='brand_validated', to=settings.AUTH_USER_MODEL),
        ),
    ]
